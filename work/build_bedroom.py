from pathlib import Path
import html,textwrap,json
exec(Path('work/build_wireframe.py').read_text(encoding='utf-8').split('latest=')[0])
src=Path('work/build_inspiration.py').read_text(encoding='utf-8')
exec(src[src.index('def center('):src.index('def save(')])
exec(src[src.index('def footer('):src.index('def make(')])
ideas=[('bedroom-soft','Inspiration','15 Small Bedroom Ideas'),('bedroom-soft','Inspiration','12 Warm Neutral Bedroom Ideas'),('bedroom-modern','Inspiration','Modern Luxury Bedroom Ideas'),('bedroom-soft','Inspiration','Minimalist Bedroom Ideas'),('lamp','Inspiration','Bedroom Lighting Ideas'),('bedroom-modern','Inspiration','Small Bedroom Layout Ideas')]
def make(m=False):
 d=Design(390 if m else 1440);w=d.w;p=24 if m else 80;cw=w-2*p;sections=[]
 def heading(t,key=None):
  nonlocal y
  sections.append((t,round(y)));d.a.append(f'<g id="{key or t.lower().replace(" ","-")}"><title>{html.escape(t)}</title>');y+=d.text(t,p,y,29 if m else 39,cw,True)+25;d.a.append('</g>')
 def grid(items):
  nonlocal y
  if m:
   for im,tag,t in items:y+=d.card(im,tag,t,p,y,cw,230)+40
  else:
   for r in range(0,len(items),3):y+=max(d.card(im,tag,t,p+j*438,y,404,260) for j,(im,tag,t) in enumerate(items[r:r+3]))+45
 def link(t):
  nonlocal y
  d.text(t,p,y,12,color=OLIVE);y+=85
 def feature(im,tag,t,desc,cta):
  nonlocal y
  if m:
   d.photo(im,p,y,cw,310);y+=310;start=y;d.rect(p,y,cw,330,SAND);d.text(tag,p+22,y+38,10,color=OLIVE);y+=82;y+=d.text(t,p+22,y,32,cw-44,True)+16;y+=d.text(desc,p+22,y,15,cw-44)+20;d.text(cta,p+22,y,12,color=OLIVE);y=max(start+330,y+25)+75
  else:
   d.photo(im,p,y,800,530);d.rect(880,y,480,530,SAND);d.text(tag,920,y+61,11,color=OLIVE);d.text(t,920,y+127,46,395,True);d.text(desc,920,y+342,17,380);d.text(cta,920,y+458,13,color=OLIVE);y+=630
 def rows(items,descriptions=False):
  nonlocal y
  for item in items:
   title,desc=item if descriptions else (item,None);d.rect(p,y,cw,1,'#D6D1C5');y+=39;y+=d.text(title,p,y,24 if m else 29,cw-35,True)+12
   if desc:y+=d.text(desc,p,y,14 if m else 16,cw-40,color=MUTED)+15
   d.text('→',w-p-22,y-22,22);y+=26
 if m:d.text('☰',24,43,22);center(d,'home & living',44,29,240,True);d.text('SEARCH',324,41,10);y=105
 else:
  d.text('IDEAS FOR A HOME',80,69,10);d.text('THAT FEELS LIKE YOU',80,84,10);center(d,'home & living',91,50,600,True);d.text('THE WEEKLY EDIT   ↗',1080,78,10)
  for s,x in [('INTERIOR DESIGN',465),('ROOMS',585),('HOME ORGANIZATION',655),('SHOPPING',805),('SEARCH',1150)]:d.text(s,x,158,10)
  d.rect(585,169,36,2,OLIVE);y=228
 d.text('Rooms › Bedroom' if m else 'Home › Rooms › Bedroom',p,y,11,color=MUTED);y+=66;center(d,'BEDROOM',y,12,cw,color=OLIVE);y+=58 if m else 76
 y+=center(d,'Bedroom ideas for creating a beautiful, comfortable and organized retreat.',y,36 if m else 57,342 if m else 1000,True)+26
 for i,(title,key) in enumerate([('Ideas','ideas'),('Organization','organization'),('Advice','advice'),('Shopping','shopping')]):
  x=p+(i%2)*179 if m else 388+i*175;yy=y+(i//2)*57 if m else y;d.a.append(f'<a href="#{key}">');d.rect(x,yy,163 if m else 155,43,SAND);d.text(title,x+14,yy+27,13);d.a.append('</a>')
 y+=155 if m else 112;feature('bedroom-modern','FEATURED BEDROOM IDEA','15 Modern Luxury Bedroom Ideas','Refined ideas for a warm modern bedroom.','READ STORY →')
 heading('Bedroom Ideas','ideas');grid(ideas[:2] if m else ideas);link('SEE ALL BEDROOM IDEAS →')
 heading('Find Your Bedroom Style');styles=[('bedroom-modern','Modern'),('bedroom-soft','Organic Modern'),('bedroom-modern','Luxury'),('bedroom-soft','Minimalist'),('bedroom-soft','Scandinavian'),('bedroom-soft','Traditional')]
 if m:
  for i,(_,t) in enumerate(styles):
   x=p+(i%2)*179;yy=y+(i//2)*67;d.rect(x,yy,163,51,SAND);d.text(t,x+13,yy+32,16)
  y+=246
 else:
  for r in range(2):
   for j,(im,t) in enumerate(styles[r*3:r*3+3]):x=p+j*438;d.photo(im,x,y,404,230);d.text(t,x,y+272,29,serif=True)
   y+=330
  y+=35
 heading('Organize Your Bedroom','organization');feature('bedroom-soft','HOME ORGANIZATION','15 Small Bedroom Storage Ideas','Smart ways to use closets, under-bed space and walls.','READ MORE →')
 for im,t in [('bedroom-soft','Closet Organization Ideas'),('bedroom-modern','Under-Bed Storage Ideas'),('bedroom-soft','Bedroom Decluttering Ideas')]:
  d.rect(p,y,cw,1,'#D6D1C5');d.photo(im,p,y+19,100 if m else 165,85 if m else 110);d.text(t,p+(120 if m else 196),y+51,22 if m else 29,cw-(120 if m else 235),True);y+=145 if m else 156
 y+=55;heading('Bedroom Advice','advice');rows(['How to Make a Small Bedroom Look Bigger','How to Arrange Bedroom Furniture','How to Layer Bedroom Lighting','How to Choose Bedroom Colors','How to Make Your Bedroom Feel More Luxurious']);y+=55
 heading('Shop the Look','shopping');d.photo('bedroom-modern',p,y,cw,370 if m else 650);y+=420 if m else 710;y+=d.text('Modern Luxury Bedroom',p,y,34 if m else 48,cw,True)+20;y+=d.text('Warm ivory · Walnut · Soft black · Layered textiles',p,y,15 if m else 18,cw)+17;y+=d.text('Recreate the room with furniture, lighting, textiles and decor selected to work together.',p,y,16 if m else 19,cw if m else 800)+25;d.rect(p,y,342 if m else 230,52,OLIVE);d.text('SHOP THIS LOOK →',p+32,y+32,13,color='#FFFFFF');y+=145
 heading('Bedroom Finds');finds=[('bedroom-soft','Shopping Finds','15 Amazon Bedroom Finds'),('bedroom-soft','Shopping Finds','Bedroom Storage Finds'),('bedroom-modern','Shopping Finds','Cozy Bedroom Finds')];grid(finds[:2] if m else finds);y+=45
 heading('Our Bedroom Picks');picks=[('lamp','Best Products','7 Best Bedside Lamps'),('bedroom-soft','Best Products','Best Bedroom Organizers'),('bedroom-soft','Best Products','Best Under-Bed Storage')];grid(picks[:2] if m else picks);y+=45
 heading('Before You Buy');rows([('How to Choose Bedroom Lighting','Understand size, placement and lighting layers.'),('How to Choose the Right Bedroom Rug','Learn how to choose size, material and placement.'),('How to Choose Bedding','Understand materials, layers and sizing.')],True);link('SEE ALL BUYING GUIDES →')
 heading('Latest From Bedroom')
 for im,tag,t in [('bedroom-modern','Interior Design','15 Modern Luxury Bedroom Ideas'),('bedroom-soft','Organization','15 Small Bedroom Storage Ideas'),('lamp','Buying Guide','How to Choose Bedroom Lighting'),('bedroom-soft','Shopping Finds','Bedroom Storage Finds')]:
  d.rect(p,y,cw,1,'#D6D1C5');d.photo(im,p,y+23,100 if m else 196,110 if m else 132);x=p+(118 if m else 226);tw=cw-(118 if m else 250);d.text(tag.upper(),x,y+39,10 if m else 11,color=OLIVE);ht=d.text(t,x,y+72,21 if m else 29,tw,True);d.text('Date',x,y+87+ht,11,color=MUTED);y+=195 if m else 178
 y+=60;nh=390 if m else 295;d.rect(0,y,w,nh,OLIVE);center(d,'Create a Better Bedroom',y+68,32 if m else 44,cw,True,'#FFFFFF');center(d,'Bedroom inspiration, organization ideas and useful finds.',y+(164 if m else 120),15,cw,color='#FFFFFF')
 if m:d.rect(24,y+243,342,48,BG);d.text('Email address',40,y+273,15);d.rect(24,y+306,342,48,'#DED5C4');center(d,'SIGN UP →',y+336,13,cw)
 else:d.rect(320,y+180,610,54,BG);d.text('Email address',340,y+213,16);d.rect(948,y+180,172,54,'#DED5C4');d.text('SIGN UP →',980,y+213,14)
 y=footer(d,y+nh,m);name='mobile' if m else 'desktop';svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{round(y)}" viewBox="0 0 {w} {round(y)}"><title>Wireframe 8 — Bedroom Hub — {name}</title><rect width="{w}" height="{round(y)}" fill="{BG}"/>'+''.join(d.a)+'</svg>';(OUT/f'bedroom-hub-wireframe-8-{name}.svg').write_text(svg,encoding='utf-8');return {'height':round(y),'sections':sections}
stats={'desktop':make(),'mobile':make(True)}
Path('work/bedroom-layout.json').write_text(json.dumps(stats,indent=2))
(OUT/'bedroom-hub-wireframe-8-preview.html').write_text('''<!doctype html><meta charset="utf-8"><title>Wireframe 8 — Bedroom Hub</title><style>body{margin:0;background:#dedbd3;font:15px Arial;color:#292b25}header{padding:24px 4%;background:#faf8f3}main{display:flex;gap:28px;padding:30px;align-items:flex-start}figure{margin:0}img{width:100%;display:block}.desktop{width:75%}.mobile{width:22%}figcaption{padding:16px 0}a{color:#46513e}</style><header><b>Wireframe 8 — Bedroom Hub</b><p>Featured story · bedroom ideas · styles · organization · advice · Shop the Look · shopping finds · best products · buying guides · latest stories · newsletter · complete footer.</p><p>Illustrative photography and sample editorial content; dates are placeholders. Style destinations are conditional on sufficient published content. Section jump links work in the full-size SVGs. These designs are Figma-importable; the online file is unchanged.</p><a href="bedroom-hub-wireframe-8-desktop.svg">Open desktop at full size</a> · <a href="bedroom-hub-wireframe-8-mobile.svg">Open mobile at full size</a></header><main><figure class="desktop"><figcaption>DESKTOP · 1440 PX</figcaption><img src="bedroom-hub-wireframe-8-desktop.svg"></figure><figure class="mobile"><figcaption>MOBILE · 390 PX</figcaption><img src="bedroom-hub-wireframe-8-mobile.svg"></figure></main>''',encoding='utf-8')
print(json.dumps(stats))

