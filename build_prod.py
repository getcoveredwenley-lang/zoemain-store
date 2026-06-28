import base64
IMG={k:f"img/{k}.jpg" for k in ["greenhoodie","greenback","pinkhoodie","tee","zoe","goat"]}
HERO=IMG["greenhoodie"]
PRODUCTS=[
 {"id":"green-hoodie","code":"ZHG","name":"Heavyweight Hoodie — Green","price":80,"cat":"Hoodies","badge":"NEW","bc":"b-new","img":IMG["greenhoodie"],
  "meaning":"ZHG — Zoemain · Hoodie · Green","fit":"Oversized · structured",
  "material":"French terry cotton · garment-dyed",
  "desc":"A weighty cotton hood that holds its shape and softens with you. The cornerstone of the line."},
 {"id":"blush-hoodie","code":"ZHB","name":"Heavyweight Hoodie — Blush","price":80,"cat":"Hoodies","badge":"LIMITED","bc":"b-ltd","img":IMG["pinkhoodie"],
  "meaning":"ZHB — Zoemain · Hoodie · Blush","fit":"Oversized · structured",
  "material":"French terry cotton · soft blush",
  "desc":"The same hood, in a soft blush. Quiet on the rack, loud in the right way."},
 {"id":"bone-tee","code":"ZTB","name":"Heavyweight Tee — Bone","price":50,"cat":"Tops","badge":"NEW","bc":"b-new","img":IMG["tee"],
  "meaning":"ZTB — Zoemain · Tee · Bone","fit":"Boxy · dropped shoulder",
  "material":"French terry cotton · bone",
  "desc":"A boxy tee in honest bone cotton. The piece you reach for without thinking."},
 {"id":"zoe-pendant","code":"ZPZ","name":"Zoe Pendant","price":50,"cat":"Jewelry","badge":"","bc":"","img":IMG["zoe"],
  "meaning":"ZPZ — Zoemain · Pendant · Zoe","fit":"Lettered chain · 18 in",
  "material":"Polished alloy ‘Zoe’ pendant · lettered chain",
  "desc":"The Zoe pendant on a lettered chain. Worn close, never loud."},
 {"id":"goat-pendant","code":"ZPG","name":"Goat Pendant","price":50,"cat":"Jewelry","badge":"LIMITED","bc":"b-ltd","img":IMG["goat"],
  "meaning":"ZPG — Zoemain · Pendant · Goat","fit":"Curb chain · 20 in",
  "material":"Polished alloy goat charm · curb chain",
  "desc":"The goat — bold, personal, one to keep."},
]
def card(p):
    onchips='<span class="chip">S</span><span class="chip on">M</span><span class="chip">L</span><span class="chip">XL</span>'
    chips='' if p["cat"]=="Jewelry" else f'<div class="chips">{onchips}</div>'
    badge=f'<span class="badge {p["bc"]}">{p["badge"]}</span>' if p["badge"] else ""
    return (f'<div class="card" data-id="{p["id"]}" data-code="{p["code"]}" data-cat="{p["cat"]}" data-name="{p["name"]}" '
            f'data-price="${p["price"]}" data-pricev="{p["price"]}" data-badge="{p["badge"]}" data-bc="{p["bc"]}" '
            f'data-img="{p["img"]}" data-meaning="{p["meaning"]}" data-material="{p["material"]}" data-fit="{p["fit"]}" data-desc="{p["desc"]}" onclick="openProduct(this)">'
            f'<div class="thumb">{badge}<img src="{p["img"]}" alt="{p["code"]}" loading="lazy"></div>'
            f'<div class="prow"><span class="pname">{p["code"]}</span><span class="pprice">${p["price"]}</span></div>'
            f'{chips}</div>')
home_cards="\n".join(card(p) for p in PRODUCTS[:3])
shop_cards="\n".join(card(p) for p in PRODUCTS)
LOGO_B64="data:image/png;base64,"+base64.b64encode(open("img/logo.png","rb").read()).decode()
CSS=open("_css.txt").read(); JS=open("_js.txt").read().replace("__LOGO__",LOGO_B64); HTML=open("_html.txt").read()
HTML=HTML.replace("__CSS__",CSS).replace("__JS__",JS).replace("__HOME_CARDS__",home_cards).replace("__SHOP_CARDS__",shop_cards).replace("__HERO__",HERO)
open("index.html","w").write(HTML); print("index.html bytes",len(HTML))
