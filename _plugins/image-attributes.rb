# frozen_string_literal: true

require "uri"

# 构建时为文章和页面中的 <img> 补充性能属性：
# - loading="lazy" / decoding="async"：首屏外的图片不再随页面一起下载；
# - width / height：按站内图片的真实像素补齐，让浏览器提前预留空间，避免加载时页面跳动。
# 已声明 loading 或 fetchpriority 的图片（如侧栏头像）视为模板有意控制，不做改动。
module ImageAttributes
  IMG_TAG = /<img\b[^>]*>/i.freeze
  SKIP_ATTRIBUTES = /\s(?:loading|fetchpriority)\s*=/i.freeze
  SIZE_ATTRIBUTES = /\s(?:width|height)\s*=|\sstyle\s*=\s*["'][^"']*\b(?:width|height)\s*:/i.freeze
  SRC_ATTRIBUTE = /\ssrc\s*=\s*["']([^"']+)["']/i.freeze

  module_function

  def process(document)
    return unless document.output_ext == '.html' && document.output&.include?('<img')

    site = document.site
    document.output = document.output.gsub(IMG_TAG) { |tag| enhance(tag, site) }
  end

  def enhance(tag, site)
    return tag if tag.match?(SKIP_ATTRIBUTES)

    extra = +' loading="lazy" decoding="async"'
    unless tag.match?(SIZE_ATTRIBUTES)
      size = local_image_size(tag[SRC_ATTRIBUTE, 1], site)
      extra << %( width="#{size[0]}" height="#{size[1]}") if size
    end

    tag.sub(/\s*\/?>\z/) { |ending| "#{extra}#{ending.strip == '/>' ? ' />' : '>'}" }
  end

  def local_image_size(src, site)
    return unless src&.start_with?('/') && !src.start_with?('//')

    path = File.join(site.source, URI.decode_www_form_component(src.split(/[?#]/).first))
    return unless File.file?(path)

    @cache ||= {}
    @cache.fetch(path) { @cache[path] = read_size(path) }
  rescue ArgumentError
    nil
  end

  # 只解析文件头，不引入图像处理依赖；无法识别的格式返回 nil，保持原样输出。
  def read_size(path)
    File.open(path, 'rb') do |file|
      header = file.read(30) || ''
      if header.start_with?("\x89PNG".b)
        header[16, 8].unpack('NN')
      elsif header.start_with?('GIF8')
        header[6, 4].unpack('vv')
      elsif header.start_with?('RIFF') && header[8, 4] == 'WEBP'
        webp_size(header)
      elsif header.start_with?("\xFF\xD8".b)
        file.rewind
        jpeg_size(file)
      end
    end
  end

  def webp_size(header)
    case header[12, 4]
    when 'VP8 '
      width, height = header[26, 4].unpack('vv')
      [width & 0x3fff, height & 0x3fff]
    when 'VP8L'
      bits = header[21, 4].unpack1('V')
      [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]
    when 'VP8X'
      width = header[24, 3].bytes.each_with_index.sum { |byte, index| byte << (8 * index) }
      height = header[27, 3].bytes.each_with_index.sum { |byte, index| byte << (8 * index) }
      [width + 1, height + 1]
    end
  end

  def jpeg_size(file)
    file.read(2)
    loop do
      marker = file.read(2)
      return unless marker && marker.getbyte(0) == 0xFF

      code = marker.getbyte(1)
      length = file.read(2)&.unpack1('n')
      return unless length

      # SOF0–SOF15（排除 DHT、JPG、DAC）携带图片尺寸。
      if (0xC0..0xCF).cover?(code) && ![0xC4, 0xC8, 0xCC].include?(code)
        height, width = file.read(5).unpack('xnn')
        return [width, height]
      end
      file.seek(length - 2, IO::SEEK_CUR)
    end
  end
end

Jekyll::Hooks.register [:posts, :pages], :post_render do |document|
  ImageAttributes.process(document)
end
