from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

locales = {
  'en': {'headline':'Launch cleaner pages','sub':'Local audits for SEO, links, images, a11y basics, and schema.','cta':'Private by default. Built for web teams.','badges':['SEO','Links','Images','A11y','Schema']},
  'zh_CN': {'headline':'上线前，先扫一遍','sub':'本地检查 SEO、链接、图片、可访问性基础项和结构化数据。','cta':'默认本地扫描，不上传页面内容。','badges':['SEO','链接','图片','可访问性','结构化数据']},
  'zh_TW': {'headline':'上線前，先掃一遍','sub':'本機檢查 SEO、連結、圖片、無障礙基礎項與結構化資料。','cta':'預設本機掃描，不上傳頁面內容。','badges':['SEO','連結','圖片','無障礙','結構化資料']},
  'ja': {'headline':'公開前に品質チェック','sub':'SEO、リンク、画像、アクセシビリティ基礎、構造化データをローカル監査。','cta':'ページ内容は既定でアップロードされません。','badges':['SEO','リンク','画像','A11y','Schema']},
  'ko': {'headline':'출시 전 로컬 QA','sub':'SEO, 링크, 이미지, 접근성 기초, 구조화 데이터를 점검하세요.','cta':'기본적으로 페이지 콘텐츠를 업로드하지 않습니다.','badges':['SEO','링크','이미지','A11y','Schema']},
  'de': {'headline':'Bessere Seiten vor dem Launch','sub':'Lokale Audits für SEO, Links, Bilder, A11y-Grundlagen und Schema.','cta':'Privat by default. Für Webteams gebaut.','badges':['SEO','Links','Bilder','A11y','Schema']},
  'fr': {'headline':'Publiez des pages plus propres','sub':'Audit local du SEO, des liens, images, accessibilité et données structurées.','cta':'Confidentiel par défaut. Pensé pour les équipes web.','badges':['SEO','Liens','Images','A11y','Schema']},
  'es': {'headline':'Publica páginas más limpias','sub':'Auditorías locales de SEO, enlaces, imágenes, accesibilidad y datos estructurados.','cta':'Privado por defecto. Para equipos web.','badges':['SEO','Enlaces','Imágenes','A11y','Schema']},
  'pt_BR': {'headline':'Publique páginas melhores','sub':'Auditorias locais de SEO, links, imagens, acessibilidade e dados estruturados.','cta':'Privado por padrão. Feito para equipes web.','badges':['SEO','Links','Imagens','A11y','Schema']},
}

LATIN_REGULAR = '/System/Library/Fonts/Supplemental/Georgia.ttf'
LATIN_BOLD = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
CJK_FONT = '/System/Library/Fonts/Hiragino Sans GB.ttc'
JP_FONT = '/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc'
KO_FONT = '/System/Library/Fonts/AppleSDGothicNeo.ttc'
FALLBACK = '/System/Library/Fonts/Supplemental/Arial Unicode.ttf'

def font_path(locale: str, bold=False):
    if locale in ('zh_CN','zh_TW'): return CJK_FONT if Path(CJK_FONT).exists() else FALLBACK
    if locale == 'ja': return JP_FONT if Path(JP_FONT).exists() else FALLBACK
    if locale == 'ko': return KO_FONT if Path(KO_FONT).exists() else FALLBACK
    return LATIN_BOLD if bold else LATIN_REGULAR

def load_font(locale, size, bold=False):
    try: return ImageFont.truetype(font_path(locale, bold), size)
    except Exception: return ImageFont.truetype(FALLBACK, size)

def text_width(draw, text, font): return draw.textbbox((0,0), text, font=font)[2]
def text_height(draw, text, font):
    box = draw.textbbox((0,0), text, font=font)
    return box[3] - box[1]

def wrap_text(draw, text, font, max_width):
    if not text: return ['']
    # CJK/Korean/Japanese wrap by character; Latin by words.
    if any('\u3040' <= ch <= '\u30ff' or '\u3400' <= ch <= '\u9fff' or '\uac00' <= ch <= '\ud7af' for ch in text):
        units = list(text)
        lines, line = [], ''
        for ch in units:
            candidate = line + ch
            if text_width(draw, candidate, font) <= max_width or not line:
                line = candidate
            else:
                lines.append(line); line = ch
        if line: lines.append(line)
        return lines
    words = text.split(' ')
    lines, line = [], ''
    for word in words:
        candidate = word if not line else f'{line} {word}'
        if text_width(draw, candidate, font) <= max_width or not line:
            line = candidate
        else:
            lines.append(line); line = word
    if line: lines.append(line)
    return lines

def fit_font(draw, locale, text, max_width, max_lines, start_size, min_size, bold=False):
    for size in range(start_size, min_size-1, -2):
        font = load_font(locale, size, bold)
        lines = wrap_text(draw, text, font, max_width)
        if len(lines) <= max_lines:
            return font, lines
    font = load_font(locale, min_size, bold)
    lines = wrap_text(draw, text, font, max_width)[:max_lines]
    if len(lines) == max_lines and text_width(draw, lines[-1] + '…', font) > max_width:
        while lines[-1] and text_width(draw, lines[-1] + '…', font) > max_width:
            lines[-1] = lines[-1][:-1]
        lines[-1] += '…'
    return font, lines

def draw_lines(draw, xy, lines, font, fill, line_gap=8):
    x, y = xy
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        y += text_height(draw, line, font) + line_gap
    return y

out = Path('store-assets/localized')
out.mkdir(parents=True, exist_ok=True)

for locale, copy in locales.items():
    img = Image.new('RGB', (1280, 800), '#f7efe0')
    draw = ImageDraw.Draw(img)
    for x in range(0, 1280, 32): draw.line((x,0,x,800), fill='#eadfcb')
    for y in range(0, 800, 32): draw.line((0,y,1280,y), fill='#eadfcb')
    draw.ellipse((-210,-170,430,410), fill='#d7ff4f')
    draw.ellipse((938,520,1450,1020), fill='#172019')
    draw.rounded_rectangle((70,70,1210,730), radius=42, fill='#fffaf0', outline='#172019', width=3)
    draw.rectangle((84,84,1196,716), outline='#172019', width=1)

    left_x, top_y, left_w = 118, 126, 610
    product_x, product_y, product_w, product_h = 805, 150, 300, 470

    brand_font = load_font(locale, 24, bold=False)
    draw.text((left_x, top_y), 'Web QA Inspector', font=brand_font, fill='#667845')

    headline_font, headline_lines = fit_font(draw, locale, copy['headline'], left_w, 2, 60, 34, bold=True)
    y = draw_lines(draw, (left_x, 174), headline_lines, headline_font, '#172019', 4)

    sub_font, sub_lines = fit_font(draw, locale, copy['sub'], left_w, 2, 30, 21, bold=False)
    y = draw_lines(draw, (left_x, y + 24), sub_lines, sub_font, '#172019', 6)

    badge_font = load_font(locale, 22, bold=True)
    bx, by = left_x, max(382, y + 28)
    for badge in copy['badges']:
        w = int(text_width(draw, badge, badge_font) + 34)
        if bx + w > left_x + left_w:
            by += 62; bx = left_x
        draw.rounded_rectangle((bx, by, bx+w, by+48), radius=24, fill='#172019', outline='#172019')
        draw.text((bx+17, by+10), badge, font=badge_font, fill='#fffaf0')
        bx += w + 12

    # product mock card, intentionally smaller so it never covers headline/subcopy.
    px, py = product_x, product_y
    draw.rounded_rectangle((px, py, px+product_w, py+product_h), radius=28, fill='#f7efe0', outline='#172019', width=3)
    draw.rounded_rectangle((px+22, py+26, px+product_w-22, py+96), radius=18, fill='#172019')
    score_font = load_font('en', 28, bold=True)
    draw.text((px+42, py+45), 'Score 92', font=score_font, fill='#d7ff4f')
    metric_font = load_font('en', 24, bold=True)
    label_font = load_font('en', 18)
    metrics = [('0','Errors','#bd4b2b'),('4','Warn','#e1a72f'),('31','Pass','#667845')]
    mx = px+22
    for val,label,color in metrics:
        draw.rounded_rectangle((mx, py+124, mx+78, py+198), radius=14, fill='#fffaf0', outline='#172019', width=1)
        draw.text((mx+18, py+136), val, font=metric_font, fill=color)
        draw.text((mx+14, py+166), label, font=label_font, fill='#6a6f5f')
        mx += 90
    issue_font = load_font('en', 20, bold=True)
    issues=[('SEO','Canonical URL'),('Links','JavaScript link'),('A11y','Button name')]
    iy=py+230
    for cat,msg in issues:
        draw.rounded_rectangle((px+22, iy, px+product_w-22, iy+62), radius=14, fill='#fffaf0', outline='#d5c9b8')
        draw.text((px+38, iy+18), cat, font=issue_font, fill='#667845')
        draw.text((px+112, iy+18), msg, font=issue_font, fill='#172019')
        iy += 78

    cta_font, cta_lines = fit_font(draw, locale, copy['cta'], 520, 1, 25, 18, bold=True)
    draw.rounded_rectangle((left_x, 604, left_x+540, 666), radius=31, fill='#d7ff4f', outline='#172019', width=2)
    draw_lines(draw, (left_x+28, 620), cta_lines, cta_font, '#172019', 0)

    img.save(out / f'{locale}-store-1280x800.png')

listing = Path('docs/store-listing-localized.md')
lines = ['# Web QA Inspector 多语言商店文案\n']
for locale, copy in locales.items():
    lines.append(f'## {locale}\n')
    lines.append(f"短描述：{copy['sub']}\n")
    lines.append(f"标题/宣传语：{copy['headline']}\n")
    lines.append(f"截图：store-assets/localized/{locale}-store-1280x800.png\n")
listing.write_text('\n'.join(lines))
