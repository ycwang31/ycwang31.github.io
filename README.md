# Yongcong Wang's Academic Homepage

Source for [ycwang31.github.io](https://ycwang31.github.io/). The site uses
[academic-homepage](https://github.com/luost26/academic-homepage) as its visual
and structural foundation, with Yongcong Wang's profile, publications, news,
experience, and research information mapped into Jekyll data files.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000/`.

## Content map

- `_data/profile.yml`: profile, education, experience, honors, interests, service, and skills
- `_publications/`: one Markdown file per publication
- `_news/`: one Markdown file per update
- `images/`: portrait, WeChat QR code, and favicon assets
- `Yongcong-Wang-Resume.pdf`: curriculum vitae

Institution logos and publication cover images are intentionally optional. When
a publication cover is omitted, the template renders its built-in visual-hash
placeholder.

## Attribution

The adapted template is Copyright © 2024 Shitong Luo and distributed under the
MIT License. See `LICENSE` for the complete notice.
