---
layout: page
title: 他
permalink: /about/
---

<div class="about-page">
  <section class="about-hero" aria-label="简介">
    <p class="about-hero__lead">一个一无所有的人。</p>
    <p>观代码，写文字，做一些能留下痕迹的小东西。偏爱简单、直接、能长期使用的东西。</p>
  </section>

  <section class="about-block about-block--wide" aria-labelledby="about-state">
    <h3 id="about-state">状态</h3>
    <ul class="about-verse">
      <li>自称文艺青年。</li>
      <li>偶尔选择逃避。</li>
      <li>经常忘了烦恼。</li>
      <li>逐渐学会无所谓。</li>
    </ul>
  </section>

  <div class="about-grid">
    <section class="about-block" aria-labelledby="about-focus">
      <h3 id="about-focus">关注</h3>
      <ul class="about-tags">
        <li>编程</li>
        <li>音乐</li>
        <li>影像</li>
        <li>AI</li>
        <li>工具</li>
        <li>生活记录</li>
      </ul>
      <p>不追求复杂表达，更在意结果是否真实。</p>
    </section>

    <section class="about-block" aria-labelledby="about-contact">
      <h3 id="about-contact">找到我</h3>
      <ul class="about-links">
        {% if site.social.github %}
        <li><a href="https://github.com/{{ site.social.github }}" target="_blank" rel="noopener noreferrer">GitHub<span class="about-links__meta">{{ site.social.github }}</span></a></li>
        {% endif %}
        <li><a href="/feed.xml">RSS<span class="about-links__meta">订阅更新</span></a></li>
        {% if site.social.mail %}
        <li><a href="mailto:{{ site.social.mail }}">Email<span class="about-links__meta">{{ site.social.mail }}</span></a></li>
        {% endif %}
      </ul>
    </section>
  </div>

  <p class="about-note">留下活着的痕迹。</p>
</div>
