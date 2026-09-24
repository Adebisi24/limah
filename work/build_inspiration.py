from pathlib import Path
import html, textwrap, base64, json
base=Path('work/build_wireframe.py').read_text(encoding='utf-8').split('latest=')[0]
exec(base)
ideas=[
('Make the Bed the Focal Point','bedroom-modern','A substantial upholstered bed anchors the room and establishes a quiet sense of luxury. Keep surrounding furniture visually lighter so the bed remains the strongest element in the space.','Repeat one material or color from the bed elsewhere in the room to create cohesion.'),
('Layer Your Lighting','bedroom-modern','Use more than one light source to create depth. Combine ambient lighting with bedside task lights and a decorative accent. Each layer should serve a purpose, from getting dressed to settling down with a book.',None),
('Use Warm Natural Materials','bedroom-soft','Natural wood, linen, and textured fabrics soften contemporary bedrooms. Introduce a few tactile finishes and repeat them thoughtfully, letting the materials provide interest without adding visual clutter.',None),
('Choose a Thoughtful Bedside Pairing','bedroom-modern','Give each side of the bed a useful surface and a comfortable pool of light. Consider the height of the mattress when choosing a nightstand, and leave enough space for the things you use every evening.',None),
('Build a Beautifully Layered Bed','bedroom-soft','Begin with comfortable sheets, then add a softly textured cover and a throw. Vary the weight of the fabrics rather than filling the bed with cushions that have nowhere to go at night.',None),
('Add Floor-to-Ceiling Curtains','bedroom-modern','Long curtains give windows a generous frame and soften the hard edges of a room. Allow the fabric to fall neatly to the floor and choose a lining that suits the light and privacy you need.',None),
('Create a Sitting Area','bedroom-modern','If the floor plan allows, make a small place to pause beyond the bed. A comfortable chair, a reading light, and a compact table can turn an unused corner into a daily retreat.',None),
('Layer Textures','bedroom-soft','Pair smooth surfaces with softer, more tactile finishes. Linen beside painted wood, a woven rug under an upholstered bed, and a softly draped throw bring depth to a restrained palette.','Keep the colors related so the textures, rather than competing patterns, do the work.'),
('Ground the Room with a Rug','bedroom-modern','A generously sized rug connects the bed and surrounding furniture. Plan its placement around the routes you walk most often, leaving a comfortable landing beside the bed.',None),
('Give Everyday Objects a Place','bedroom-soft','A calm room works as beautifully as it looks. Use drawers, baskets, and a small bedside tray to keep useful objects close while leaving the main surfaces easy to enjoy.',None),
('Balance Symmetry with Character','bedroom-modern','Matching lamps or bedside tables can create an orderly foundation. Soften the symmetry with a personal object, a branch in a vase, or a different arrangement on each side.',None),
('Leave Space to Breathe','bedroom-soft','A few well-proportioned pieces can feel more luxurious than a crowded room. Preserve comfortable walking routes and give the shapes and materials you love enough space to stand out.',None),
('Use Oversized Art','bedroom-modern','One substantial artwork can establish a focal point without making the room feel busy. Consider its scale alongside the furniture and choose colors that connect with the rest of the room.',None),
('Keep the Palette Cohesive','bedroom-soft','Choose a small family of colors and vary their depth across bedding, curtains, and accessories. Warm neutrals can be grounded with a darker accent, while a gentle color adds personality.','Check paint and fabric samples together in both daylight and evening light.'),
('Add Personal Details','bedroom-soft','Finish with the objects that make the room yours: a favorite photograph, a meaningful artwork, or a book you return to. A beautiful bedroom should feel lived in, comfortable, and personal.',None)]
intro=('Modern luxury does not need to mean excessive decoration. A sophisticated bedroom can combine comfort, thoughtful proportions, rich materials, and restrained details. The result should feel inviting at the end of a long day, with a layout that supports the way you actually live. '
'Start with the elements you use most: a comfortable bed, practical lighting, and textiles that feel good against the skin. Then build interest through natural finishes, a cohesive palette, and a few objects with personal meaning. These fifteen ideas show how to create that balance, whether you are planning a complete refresh or making a few considered changes to the room you already have.')
def center(d,s,y,size,width,serif=False,color=INK):
 lines=textwrap.wrap(s,width=max(8,int(width/(size*.52))))
 for i,line in enumerate(lines):d.a.append(f'<text x="{d.w/2}" y="{y+i*size*1.22}" text-anchor="middle" font-family="{"Georgia" if serif else "Arial"}" font-size="{size}" fill="{color}">{html.escape(line)}</text>')
 return len(lines)*size*1.22
def para(d,s,x,y,w,size):return d.text(s,x,y,size,w)+12
def save(d,name):
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{d.w}" height="{round(d.y)}" viewBox="0 0 {d.w} {round(d.y)}"><title>Wireframe 2 — Inspiration Article — {name}</title><rect width="{d.w}" height="{round(d.y)}" fill="{BG}"/>'+''.join(d.a)+'</svg>'
 (OUT/f'inspiration-wireframe-2-{name}.svg').write_text(svg,encoding='utf-8')
def footer(d,y,mobile):
 w=d.w;p=24 if mobile else 80;h=840 if mobile else 455;d.rect(0,y,w,h,SAND);d.text('home & living',p,y+80,36 if mobile else 43,serif=True);d.text('Ideas for a home that feels like you.',p,y+120,14)
 groups=[('EXPLORE',['Interior Design','Rooms','Home Organization','Shopping']),('ROOMS',['Bedroom','Living Room','Kitchen','Bathroom']),('SHOPPING',['Best Products','Buying Guides','Shopping Finds','Shop the Look'])]
 for j,(title,links) in enumerate(groups):
  x=(24 if j!=1 else 215) if mobile else 600+j*255;yy=y+(185 if j<2 else 388) if mobile else y+76
  d.text(title,x,yy,11,color=OLIVE)
  for i,link in enumerate(links):d.text(link,x,yy+39+i*34,14)
 if mobile:
  d.text('PINTEREST ↗     INSTAGRAM ↗',24,y+579,12);d.rect(24,y+610,342,1,'#D6D1C5');d.text('About · Contact · Editorial Policy',24,y+644,13);d.text('Affiliate Disclosure · Privacy · Terms',24,y+680,13);para(d,'Some shopping links may earn us a commission. Read our affiliate disclosure.',24,y+725,342,12);d.text('© 2026 Home & Living.',24,y+800,12)
 else:
  d.text('PINTEREST ↗     INSTAGRAM ↗',80,y+170,12);d.rect(80,y+280,1280,1,'#D6D1C5');d.text('About     Contact     Editorial Policy     Affiliate Disclosure     Privacy     Terms',80,y+325,14);d.text('Some shopping links may earn us a commission. Read our affiliate disclosure.',80,y+370,13);d.text('© 2026 Home & Living. All rights reserved.',80,y+414,12)
 return y+h
def make(mobile=False):
 d=Design(390 if mobile else 1440);w=d.w;p=24 if mobile else 160;iw=w-2*p;rw=342 if mobile else 680;rx=(w-rw)/2;fs=16 if mobile else 18
 if mobile:
  d.text('☰',24,43,22);center(d,'home & living',44,29,240,True);d.text('SEARCH',324,41,10);y=100;d.text('Home  ›  Bedroom',24,y,11,color=MUTED);y+=58
 else:
  d.text('IDEAS FOR A HOME',80,69,10);d.text('THAT FEELS LIKE YOU',80,84,10);center(d,'home & living',91,50,600,True);d.text('THE WEEKLY EDIT   ↗',1080,78,10)
  for title,x in [('INTERIOR DESIGN',465),('ROOMS',585),('HOME ORGANIZATION',655),('SHOPPING',805),('SEARCH',1150)]:d.text(title,x,158,10)
  d.text('Home  ›  Interior Design  ›  Bedroom',160,228,12,color=MUTED);y=307
 center(d,'INTERIOR DESIGN',y,11,iw,color=OLIVE);y+=48 if mobile else 65
 y+=center(d,'15 Modern Luxury Bedroom Ideas for an Elegant Home',y,38 if mobile else 62,342 if mobile else 1080,True)+20
 y+=center(d,'Sophisticated bedroom ideas using beautiful materials, layered lighting, thoughtful furniture and warm details.',y,16 if mobile else 20,342 if mobile else 800)+22
 center(d,'By Author Name  ·  Updated Date',y,12,iw,color=MUTED);y+=40
 hero=385 if mobile else 650;d.photo('bedroom-modern',p,y,iw,hero);y+=hero+24;d.text('Image credit · illustrative photography',p,y,10,color=MUTED);y+=65 if mobile else 86
 y+=para(d,intro,rx,y,rw,fs)+70
 positions=[]
 for i,(title,im,body,tip) in enumerate(ideas,1):
  positions.append({'idea':i,'y':round(y)});center(d,f'{i:02}',y,19 if mobile else 22,100,color=OLIVE);y+=42
  y+=center(d,title,y,30 if mobile else 42,342 if mobile else 800,True)+25
  idea_width=342 if mobile else 840;idea_x=(w-idea_width)/2;ih=300 if mobile else 420;d.photo(im,idea_x,y,idea_width,ih);y+=ih+25;d.text('Image credit · illustrative photography',idea_x,y,10,color=MUTED);y+=43
  y+=para(d,body,rx,y,rw,fs)
  if tip:
   th=145 if mobile else 115;d.rect(rx,y+15,rw,th,SAND);d.rect(rx,y+15,3,th,OLIVE);d.text('DESIGN TIP',rx+22,y+48,11,color=OLIVE);d.text(tip,rx+22,y+79,14,rw-44);y+=th+35
  if i==2:d.text('Bedroom Lighting Guide →',rx,y+22,13,color=OLIVE);y+=46
  y+=75 if mobile else 105
  if i==5:
   center(d,'LOVE THIS BEDROOM?',y,12,iw,color=OLIVE);y+=34
   if mobile:
    d.photo('bedroom-modern',24,y,342,270);y+=270;d.rect(24,y,342,265,SAND);d.text('SHOP THE LOOK',46,y+40,11,color=OLIVE);d.text('Modern Luxury Bedroom',46,y+83,30,290,True);d.text('Bed • Nightstand • Lamp • Rug',46,y+166,14);d.text('SHOP THIS LOOK →',46,y+221,13,color=OLIVE);y+=350
   else:
    d.photo('bedroom-modern',160,y,620,440);d.rect(780,y,500,440,SAND);d.text('SHOP THE LOOK',822,y+72,12,color=OLIVE);d.text('Modern Luxury Bedroom',822,y+142,42,410,True);d.text('Bed • Nightstand • Lamp • Rug',822,y+278,16);d.text('SHOP THIS LOOK →',822,y+357,13,color=OLIVE);y+=540
  if i==10:
   h=185 if mobile else 160;d.rect(rx,y,rw,h,SAND);d.text('BEDROOM LIGHTING',rx+24,y+34,11,color=OLIVE);d.text('Looking for the right bedside lighting?',rx+24,y+70,16,rw-48);d.text('7 Best Bedside Lamps for Beautiful Bedrooms →',rx+24,y+122,18,rw-48,True);y+=h+100
 y+=center(d,'Creating a Luxury Bedroom',y,32 if mobile else 42,iw,True)+30
 y+=para(d,'The strongest luxury bedrooms combine comfort, quality materials, and thoughtful details. Start with the elements that shape how the room feels every day—your bed, lighting, textiles, and layout—and build from there.',rx,y,rw,fs)+100
 related=[
 ('bedroom-soft','15 Small Bedroom Ideas','Bedroom'),
 ('bedroom-modern','12 Warm Neutral Bedroom Ideas','Bedroom'),
 ('bedroom-soft','Small Bedroom Storage Ideas','Bedroom'),
 ('bedroom-modern','Modern Bedroom Lighting Ideas','Bedroom'),
 ('bedroom-soft','Cozy Bedroom Decorating Ideas','Bedroom'),
 ('bedroom-modern','Minimalist Bedroom Ideas','Bedroom'),
 ('bedroom-soft','Organic Modern Bedroom Ideas','Bedroom'),
 ('bedroom-modern','Bedroom Layout Ideas','Bedroom'),
 ('bedroom-soft','Bedroom Color Ideas','Bedroom'),
 ('bedroom-modern','Bedroom Wall Decor Ideas','Bedroom'),
 ('bedroom-soft','Layered Bedding Ideas','Bedroom'),
 ('bedroom-modern','Bedroom Curtain Ideas','Bedroom')]
 shopping=[
 ('bedroom-soft','Amazon Bedroom Finds','Shopping Finds'),
 ('lamp','7 Best Bedside Lamps','Best Products'),
 ('bedroom-modern','Shop This Modern Luxury Bedroom','Shop the Look'),
 ('bedroom-soft','Bedroom Storage Finds','Shopping Finds'),
 ('bedroom-modern','How to Choose Bedroom Lighting','Buying Guide'),
 ('bedroom-soft','Best Bedroom Organizers','Best Products'),
 ('bedroom-modern','How to Choose a Bedroom Rug','Buying Guide'),
 ('bedroom-soft','Cozy Bedroom Finds','Shopping Finds')]
 def related_section(title,items,key):
  nonlocal y
  center(d,title,y,30 if mobile else 40,iw,True);y+=55
  d.a.append(f'<g id="{key}">')
  if mobile:
   for im,card_title,tag in items:
    d.a.append('<g data-related-card="true">');d.rect(24,y,342,1,'#D6D1C5');d.photo(im,24,y+18,120,105);d.text(tag.upper(),160,y+31,10,206,color=OLIVE);ht=d.text(card_title,160,y+61,21,206,True);d.a.append('</g>');y+=max(145,ht+85)
  else:
   for r in range(0,len(items),4):
    heights=[]
    for j,(im,card_title,tag) in enumerate(items[r:r+4]):
     d.a.append('<g data-related-card="true">');heights.append(d.card(im,tag,card_title,160+j*286,y,262,180));d.a.append('</g>')
    y+=max(heights)+45
  d.a.append('</g>');y+=65
 related_section('More Bedroom Ideas',related,'related-bedroom-ideas')
 related_section('Shop for Your Bedroom',shopping,'related-bedroom-shopping')
 y+=40;d.rect(rx,y,rw,1,'#D6D1C5');d.text('ABOUT THE AUTHOR',rx,y+38,11,color=OLIVE)
 d.rect(rx,y+63,72,72,'#DDD7CA');d.text('PHOTO',rx+14,y+106,10,color=MUTED);d.text('Author Name',rx+95,y+90,24,serif=True);d.text('Home & Interiors Writer',rx+95,y+118,13)
 y+=177;y+=para(d,'Author biography goes here, introducing the writer and their home and interiors experience.',rx,y,rw,15);d.text('VIEW ALL ARTICLES →',rx,y+25,12,color=OLIVE);y+=110
 nh=365 if mobile else 285;d.rect(0,y,w,nh,OLIVE);center(d,'Get More Beautiful Home Ideas',y+65,31 if mobile else 43,iw,True,'#FFFFFF');center(d,'Interior inspiration, organization ideas and curated finds.',y+(153 if mobile else 120),15,iw,color='#FFFFFF')
 if mobile:d.rect(24,y+215,342,48,BG);d.text('Email address',40,y+245,15);d.rect(24,y+279,342,48,'#DED5C4');center(d,'SIGN UP →',y+309,13,iw)
 else:d.rect(320,y+168,610,54,BG);d.text('Email address',340,y+201,16);d.rect(948,y+168,172,54,'#DED5C4');d.text('SIGN UP →',980,y+201,14)
 y=footer(d,y+nh,mobile);d.y=y;save(d,'mobile' if mobile else 'desktop');return {'height':round(y),'ideas':positions}
stats={'desktop':make(),'mobile':make(True)}
(OUT/'inspiration-wireframe-2-preview.html').write_text('''<!doctype html><meta charset="utf-8"><title>Wireframe 2 — Inspiration Article</title><style>body{margin:0;background:#dedbd3;font:15px Arial;color:#292b25}header{padding:24px 4%;background:white}main{display:flex;gap:28px;padding:30px;align-items:flex-start}figure{margin:0}img{width:100%;display:block}.desktop{width:75%}.mobile{width:22%}figcaption{padding:16px 0}a{color:#46513e}</style><header><b>Wireframe 2 — Inspiration Article</b><p>Your selected masthead · 15 numbered ideas · no table of contents or sidebar · one Shop the Look feature · 840 px desktop idea images · 12 related bedroom ideas and 8 shopping articles · four-column desktop grids · side-by-side mobile related cards · author, newsletter and footer.</p><p>Design sample: author details and additional editorial copy are placeholders. Photography is illustrative and reused to demonstrate the layout.</p><a href="inspiration-wireframe-2-desktop.svg">Open desktop at full size</a> · <a href="inspiration-wireframe-2-mobile.svg">Open mobile at full size</a></header><main><figure class="desktop"><figcaption>DESKTOP · 1440 PX</figcaption><img src="inspiration-wireframe-2-desktop.svg"></figure><figure class="mobile"><figcaption>MOBILE · 390 PX</figcaption><img src="inspiration-wireframe-2-mobile.svg"></figure></main>''',encoding='utf-8')
(Path('work')/'inspiration-layout.json').write_text(json.dumps(stats,indent=2))
print(json.dumps(stats))
