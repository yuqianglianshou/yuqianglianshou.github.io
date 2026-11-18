---
layout: post
title: 点字成涟：把文字变成一片涟漪
date: 2020-03-26
tags: 技术
description: 把文字拆成点阵，每个墨点是一圈扩散的涟漪。从 2015 年的文字控 WenziKong 到 2026 年用 Kotlin 和 Jetpack Compose 重写的 GlyphRipple，讲清楚点阵生成、排版、涟漪推进和绘制。
---

### 我总想在宇宙中寻求意义，他却不予以理睬。

项目地址：[https://github.com/yuqianglianshou/GlyphRipple](https://github.com/yuqianglianshou/GlyphRipple)

这是一个很小的玩具：把文字变成点阵，每个点是一圈扩散的涟漪。文字逐个浮现，从字心向外荡开，然后淡去；手指在屏幕上划过，也会留下一串涟漪。

它最早写于 2015 年，叫「文字控 WenziKong」，2020 年重构成自定义 View + Lifecycle 时写了这篇文章。2026 年又用 Kotlin 和 Jetpack Compose 整个重写了一遍，支持任意文字、多种排布与配色，名字也改成了「点字成涟 GlyphRipple」。本文按新版重写。

<br/>
<video class="post-video" src="/images/posts/wenzikong/glyphripple-scatter.mp4" poster="/images/posts/wenzikong/glyphripple-scatter-poster.webp" width="300" height="532" muted loop playsinline controls preload="none" data-autoplay aria-label="逐字随机模式：文字在屏幕各处以涟漪浮现"></video>
<br/>
<video class="post-video" src="/images/posts/wenzikong/glyphripple-sentence.mp4" poster="/images/posts/wenzikong/glyphripple-sentence-poster.webp" width="300" height="532" muted loop playsinline controls preload="none" data-autoplay aria-label="整句排版与经典点阵模式：整句文字像波浪一样扫过"></video>
<br/>

## 玩法

- 打开后文字逐个出现，每个字由一片涟漪组成，从字心向外荡开，然后淡去。
- 手指点按或滑动会留下一串涟漪，支持多指。
- 右下角的「文」打开设置：
  - **文字**：任意内容，汉字、英文、数字、emoji 都可以。
  - **排布**：逐字随机落在屏幕各处，或者整句排好、像波浪一样扫过。
  - **字形**：系统字体，或者 HZK24 宋体点阵。
  - **配色**：霓虹、深海、余烬、水墨，以及 2015 年初版的配色。
  - **速度**、**密度**（每个字的点阵行数）、**循环播放**。
- 退到后台动画暂停，回到前台继续。

## 原理

整条流水线分四步：**文字 → 点阵 → 画布坐标 → 涟漪 → 绘制**。

### 1. 文字 → 点阵

点阵用一个很朴素的结构表示：`width × height` 个格子，`true` 表示有墨。

```kotlin
class GlyphGrid(val width: Int, val height: Int, private val cells: BooleanArray) {
    val count: Int = cells.count { it }
    operator fun get(col: Int, row: Int): Boolean = cells[row * width + col]
}

interface GlyphSource {
    /** 返回一个用户可见字符的点阵，不支持时返回 null。 */
    fun glyph(grapheme: String, size: Int): GlyphGrid?
}
```

先说「一个字」怎么切。直接按 `Char` 拆，emoji 和组合字符会被劈成两半，所以用 `BreakIterator.getCharacterInstance()` 按用户眼中的字符（grapheme）拆分。

点阵有两个来源，都实现 `GlyphSource`：

**系统字体**。把字符画到一张只有几十像素高的小位图上，一个像素就是一个格子，不透明度超过阈值算有墨。系统能显示的字符都能用，包括 emoji。

```kotlin
paint.textSize = size * 0.92f
val bitmap = Bitmap.createBitmap(width, size, Bitmap.Config.ARGB_8888)
Canvas(bitmap).drawText(grapheme, 0f, baseline, paint)
bitmap.getPixels(pixels, 0, width, 0, 0, width, size)
val cells = BooleanArray(pixels.size) { Color.alpha(pixels[it]) >= 0x58 }
```

**HZK24 点阵字库**。这是老版本用的方式：GB2312 字库，每字 24×24、占 72 字节，逐行存储、高位在左。按区位码算出偏移，逐位读出即可：

```kotlin
val bytes = grapheme.toByteArray(GB2312)          // 汉字是 2 个字节
val area = (bytes[0].toInt() and 0xFF) - 0xA0     // 区码
val pos = (bytes[1].toInt() and 0xFF) - 0xA0      // 位码
val offset = ((area - 1) * 94 + (pos - 1)) * 72

for (row in 0 until 24) for (col in 0 until 24) {
    val byte = data[offset + row * 3 + col / 8].toInt()
    cells[row * 24 + col] = (byte shr (7 - col % 8)) and 1 == 1
}
```

字库里没有的字符（ASCII、emoji）返回 `null`，由 `FallbackGlyphSource(hzk, systemFont)` 依次尝试、回退到系统字体。

### 2. 点阵 → 画布坐标

`TextLayout` 把每个墨点换算成屏幕上的圆心：第 `col` 列、第 `row` 行的格子，圆心在 `(left + (col + 0.5) * cell, top + (row + 0.5) * cell)`，同时记下字的中心，后面要用。

- **逐字随机**：每个字固定高度，落在画布内的随机位置；画布放不下时等比缩小。
- **整句排版**：从左到右、自动换行、整体居中。格子边长从上限开始，排不下就乘 0.9 逐步缩小，直到整段放得进画布。空格只占位，不产生涟漪。

### 3. 圆心 → 涟漪

`TextPlayer` 按节奏出字（逐字随机每 0.9 秒一个，整句排版每 0.28 秒一个）。一个字出现时，它的每个墨点都放一个圆环，并按离字心的距离设置延迟，于是涟漪从字心向外荡开：

```kotlin
val distance = hypot(x - glyph.centerX, y - glyph.centerY)
field.spawn(
    x, y, maxRadius = glyph.cell * 1.1f,
    color = colors[random.nextInt(colors.size)],
    delay = distance / (glyph.cell * 17f) * 0.35f,
)
```

最大半径取格子边长的 1.1 倍，略大于一格，让相邻圆环互相交叠，字形才连得起来。

所有圆环放在 `RippleField` 里。圆环可能同时有几千个，所以用几组并列的 `FloatArray` / `IntArray` 存储，推进和绘制时都不分配对象：

```kotlin
private val xs = FloatArray(capacity)
private val ys = FloatArray(capacity)
private val ages = FloatArray(capacity)      // 为负表示仍在延迟中
private val lifetimes = FloatArray(capacity)
private val maxRadii = FloatArray(capacity)
private val colors = IntArray(capacity)
```

每帧 `step(dt)` 给所有圆环加上经过的时间，寿命到了就原地压缩掉，保持先后顺序。半径和透明度都由生命进度 `t`（0..1）算出：

- **半径** `maxRadius * (1 - (1 - t)²)`：先快后慢地涨开，像水面的波。
- **透明度**：前四分之三从 1 缓慢降到 0.55，最后四分之一迅速消失。

### 4. 绘制

Compose `Canvas` 跟随屏幕刷新率逐帧重绘。帧循环放在 `repeatOnLifecycle(RESUMED)` 里，退到后台自动停止、回来继续，不需要再手写 Handler 和 Lifecycle 回调：

```kotlin
lifecycleOwner.repeatOnLifecycle(Lifecycle.State.RESUMED) {
    var last = 0L
    while (true) {
        withFrameNanos { now ->
            val dt = if (last == 0L) 0f else ((now - last) / 1e9f).coerceAtMost(0.05f)
            last = now
            player.step(dt * speed)
            field.step(dt * speed)
            frame = now
        }
    }
}
```

动画按真实经过的时间推进，所以快慢与帧率无关，60Hz 和 120Hz 的屏幕看起来一样；单帧最多推进 0.05 秒，避免从后台回来时一下跳过一大段。

画圆环时线宽取半径的 1/2.5，跳过仍在延迟中的圆环：

```kotlin
for (i in 0 until field.size) {
    if (field.progress(i) < 0f) continue
    val r = field.radius(i)
    ringPaint.color = field.color(i)
    ringPaint.alpha = (field.alpha(i) * 255).toInt()
    ringPaint.strokeWidth = r / 2.5f
    native.drawCircle(field.x(i), field.y(i), r, ringPaint)
}
```

触摸也复用同一个 `RippleField`：手指每移动超过 8dp 就在当前位置放一个圆环，按 `PointerId` 分别记录，所以多指互不干扰。

## 代码结构

```
app/src/main/java/com/lq/glyphripple/
├── core/     纯 Kotlin，不依赖 Android，有单元测试
│   ├── GlyphGrid.kt     点阵与 GlyphSource 接口
│   ├── Hzk24Font.kt     HZK24 字库解析
│   ├── Graphemes.kt     按用户可见字符拆分文本
│   ├── TextLayout.kt    逐字随机 / 整句排版
│   ├── RippleField.kt   涟漪的存储与推进
│   └── TextPlayer.kt    出字节奏与循环
├── glyph/    SystemFontGlyphSource：用系统字体生成点阵
└── ui/       Compose 界面：画布、触摸、设置面板、配色
```

把点阵、排版、涟漪推进都放进不依赖 Android 的 `core/`，是这次重写最大的收获：动画逻辑可以直接写单元测试，UI 层只剩下「取点阵、按帧推进、画圆」。

## 构建

需要 JDK 17 和 Android SDK（compileSdk 37，最低支持 Android 7.0）。

```bash
./gradlew installDebug
./gradlew testDebugUnitTest
```

## 历史

- 2015：初版「文字控 WenziKong」，HZK 点阵字库 + 随机配色。
- 2017：迁移到 Android Studio。
- 2020：重构为自定义 View + Lifecycle，写了这篇文章的初版。
- 2026：用 Kotlin 和 Jetpack Compose 重写，支持任意文字、多种排布与配色，更名为「点字成涟 GlyphRipple」。
