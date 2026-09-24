from pathlib import Path
import html, textwrap, json
exec(Path('work/build_wireframe.py').read_text(encoding='utf-8').split('latest=')[0])
helpers=Path('work/build_inspiration.py').read_text(encoding='utf-8')
exec(helpers[helpers.index('def center('):helpers.index('def save(')])
exec(helpers[helpers.index('def footer('):helpers.index('def make(')])
types=[('lamp','Best Products','Compare our curated product recommendations.'),('neutral','Buying Guides','Learn what matters before you buy.'),('kitchen','Shopping Finds','Discover useful and beautiful home finds.'),('bedroom-modern','Shop the Look','Recreate beautiful interiors.')]
finds=[('bedroom-soft','Bedroom','15 Amazon Bedroom Finds'),('kitchen','Kitchen','Kitchen Finds Worth Discovering'),('neutral','Organization','Small-Space Organization Finds'),('bathroom','Bathroom','Bathroom Finds'),('living','Home Decor','Home Decor Finds'),('bedroom-soft','Affordable Finds','Beautiful Finds for Every Budget')]
picks=[('lamp','Best Products','7 Best Bedside Lamps'),('bathroom','Best Products','Best Bathroom Organizers'),('kitchen','Best Products','Best Kitchen Storage Products')]
guides=[('How to Choose Bedroom Lighting','A practical guide to scale, placement and light temperature.'),('How to Choose the Right Area Rug','Understand size, material, placement and maintenance.'),('How to Choose Storage Containers','Choose the right size and type for your space.')]
def make(m=False):
 d=Design(390 if m else 1440);w=d.w;p=24 if m else 80;cw=w-2*p;positions=[]
 def section(title,y):
  positions.append((title,round(y)));d.text(title,p,y,29 if m else 38,cw,True);return y+42 if m else y+55
 def link(s,y):d.text(s,p,y,12,color=OLIVE)
 def grid(items,y,cols=3,ih=260):
  if m:
   for im,tag,title in items:y+=d.card(im,tag,title,24,y,342,225)+38
   return y
  cell=(cw-(cols-1)*32)/cols
  for r in range(0,len(items),cols):
   heights=[d.card(im,tag,title,p+j*(cell+32),y,cell,ih) for j,(im,tag,title) in enumerate(items[r:r+cols])];y+=max(heights)+45
  return y
 if m:
  d.text('☰',24,43,22);center(d,'home & living',44,29,240,True);d.text('SEARCH',324,41,10);d.text('Home › Shopping',24,102,11,color=MUTED);y=163
 else:
  d.text('IDEAS FOR A HOME',80,69,10);d.text('THAT FEELS LIKE YOU',80,84,10);center(d,'home & living',91,50,600,True);d.text('THE WEEKLY EDIT   ↗',1080,78,10)
  for s,x in [('INTERIOR DESIGN',465),('ROOMS',585),('HOME ORGANIZATION',655),('SHOPPING',805),('SEARCH',1150)]:d.text(s,x,158,10)
  d.rect(805,169,53,2,OLIVE);d.text('Home › Shopping',80,228,12,color=MUTED);y=306
 center(d,'SHOPPING',y,12,cw,color=OLIVE);y+=53
 y+=center(d,'Curated home finds, buying advice and beautiful rooms you can recreate.',y,34 if m else 55,342 if m else 970,True)+25
 if m:
  for _,title,desc in types:
   d.rect(24,y,342,52,SAND);d.text(title,42,y+32,17);d.text('→',330,y+32,18);y+=62
 else:
  center(d,'Best Products    ·    Buying Guides    ·    Shopping Finds    ·    Shop the Look',y,14,1100);y+=45
 trust='Some shopping stories contain affiliate links. We may earn a commission from qualifying purchases.'
 y+=center(d,trust,y+10,11,342 if m else 850,color=MUTED)+25
 center(d,'How we select products · Affiliate Disclosure →',y,11,cw,color=OLIVE);y+=65
 y=section('Featured Shopping Story',y)
 if m:
  d.photo('bedroom-soft',24,y,342,310);y+=310;d.rect(24,y,342,315,SAND);d.text('SHOPPING FINDS',46,y+38,11,color=OLIVE);d.text('15 Amazon Bedroom Finds Worth Discovering',46,y+82,32,290,True);d.text('Useful, stylish finds for a more beautiful bedroom.',46,y+213,15,290);d.text('EXPLORE THE FINDS →',46,y+282,12,color=OLIVE);y+=390
 else:
  d.photo('bedroom-soft',80,y,800,545);d.rect(880,y,480,545,SAND);d.text('SHOPPING FINDS',922,y+66,12,color=OLIVE);d.text('15 Amazon Bedroom Finds Worth Discovering',922,y+134,46,390,True);d.text('Useful, stylish finds for a more beautiful bedroom.',922,y+358,18,360);d.text('EXPLORE THE FINDS →',922,y+467,13,color=OLIVE);y+=650
 if not m:
  y=section('Explore Shopping',y)
  for r in range(2):
   for j,(im,title,desc) in enumerate(types[r*2:r*2+2]):
    x=80+j*656;d.photo(im,x,y,624,280);d.text(title,x,y+324,31,serif=True);d.text('→',x+587,y+324,26);d.text(desc,x,y+363,16)
   y+=424
  y+=35
 y=section('Latest Shopping Finds',y);y=grid(finds[:2] if m else finds,y);link('SEE ALL SHOPPING FINDS →',y);y+=95
 y=section('Shop by Room',y)
 for r in range(2):
  for j,(im,title) in enumerate([('bedroom-modern','Bedroom'),('living','Living Room'),('kitchen','Kitchen'),('bathroom','Bathroom')][r*2:r*2+2]):
   cell=163 if m else 624;x=p+j*(179 if m else 656);ih=156 if m else 320;d.photo(im,x,y,cell,ih);d.text(title if m else title+' Shopping',x,y+ih+34,21 if m else 29,serif=True)
  y+=225 if m else 410
 y+=40;y=section('Shop the Look',y);ih=370 if m else 650;d.photo('bedroom-modern',p,y,cw,ih);y+=ih+48
 y+=d.text('Modern Luxury Bedroom',p,y,33 if m else 48,cw,True)+20;y+=d.text('Warm neutrals, soft upholstery, layered lighting and natural wood.',p,y,16 if m else 19,cw if m else 760)+30
 for j,s in enumerate(['Bed','Lamp','Rug','Nightstand']):
  bw=78 if m else 140;x=p+j*(88 if m else 156);d.rect(x,y,bw,44,SAND);d.text(s,x+10,y+28,11 if m else 14)
 y+=76;d.rect(p,y,342 if m else 225,52,OLIVE);d.text('SHOP THIS LOOK →',p+30,y+32,13,color='#FFFFFF');y+=147
 y=section('Our Product Picks',y);y=grid(picks[:2] if m else picks,y);link('SEE ALL BEST PRODUCTS →',y);y+=98
 y=section('Before You Buy',y)
 for title,desc in guides:
  d.rect(p,y,cw,1,'#D6D1C5');y+=39;y+=d.text(title,p,y,24 if m else 28,cw-35,True)+12;y+=d.text(desc,p,y,14 if m else 16,cw-40,color=MUTED)+25;d.text('→',w-p-22,y-35,23)
 link('SEE ALL BUYING GUIDES →',y+18);y+=116
 y=section('Latest in Shopping',y)
 for im,tag,title in [('bedroom-soft','Shopping Finds','Amazon Bedroom Finds'),('lamp','Best Products','7 Best Bedside Lamps'),('neutral','Buying Guide','How to Choose Bedroom Lighting'),('bedroom-modern','Shop the Look','Modern Luxury Bedroom')]:
  d.rect(p,y,cw,1,'#D6D1C5');d.photo(im,p,y+23,100 if m else 196,110 if m else 132);x=142 if m else 306;tw=224 if m else 970;d.text(tag.upper(),x,y+39,10 if m else 11,color=OLIVE);ht=d.text(title,x,y+71,21 if m else 29,tw,True);d.text('Date',x,y+83+ht,11,color=MUTED);y+=180 if m else 178
 y+=60;nh=392 if m else 295;d.rect(0,y,w,nh,OLIVE);center(d,'Discover Better Home Finds',y+68,32 if m else 45,cw,True,'#FFFFFF');center(d,'Design inspiration, practical buying advice and curated home finds delivered to your inbox.',y+(165 if m else 120),15,342 if m else 800,color='#FFFFFF')
 if m:
  d.rect(24,y+245,342,48,BG);d.text('Email address',40,y+275,15);d.rect(24,y+308,342,48,'#DED5C4');center(d,'SIGN UP →',y+338,13,cw)
 else:
  d.rect(320,y+180,610,54,BG);d.text('Email address',340,y+213,16);d.rect(948,y+180,172,54,'#DED5C4');d.text('SIGN UP →',980,y+213,14)
 y=footer(d,y+nh,m);name='mobile' if m else 'desktop'
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{round(y)}" viewBox="0 0 {w} {round(y)}"><title>Wireframe 3 — Shopping Landing Page — {name}</title><rect width="{w}" height="{round(y)}" fill="{BG}"/>'+''.join(d.a)+'</svg>'
 (OUT/f'shopping-wireframe-3-{name}.svg').write_text(svg,encoding='utf-8');return {'height':round(y),'sections':positions}
stats={'desktop':make(),'mobile':make(True)}
(Path('work')/'shopping-layout.json').write_text(json.dumps(stats,indent=2))
(OUT/'shopping-wireframe-3-preview.html').write_text('''<!doctype html><meta charset="utf-8"><title>Wireframe 3 — Shopping Landing Page</title><style>body{margin:0;background:#dedbd3;font:15px Arial;color:#292b25}header{padding:24px 4%;background:#faf8f3}main{display:flex;gap:28px;padding:30px;align-items:flex-start}figure{margin:0}img{width:100%;display:block}.desktop{width:75%}.mobile{width:22%}figcaption{padding:16px 0}a{color:#46513e}</style><header><b>Wireframe 3 — Shopping Landing Page</b><p>Your chosen masthead · four shopping formats · featured story · latest finds · shop by room · Shop the Look · product picks · buying guides · latest stories · newsletter · full footer.</p><p>Figma-importable SVG designs. Photography and story copy are illustrative; publication dates are placeholders.</p><a href="shopping-wireframe-3-desktop.svg">Open desktop at full size</a> · <a href="shopping-wireframe-3-mobile.svg">Open mobile at full size</a></header><main><figure class="desktop"><figcaption>DESKTOP · 1440 PX</figcaption><img src="shopping-wireframe-3-desktop.svg"></figure><figure class="mobile"><figcaption>MOBILE · 390 PX</figcaption><img src="shopping-wireframe-3-mobile.svg"></figure></main>''',encoding='utf-8')
print(json.dumps(stats))
