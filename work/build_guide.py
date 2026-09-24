from pathlib import Path
import html,textwrap,json
source=Path('work/build_best.py').read_text(encoding='utf-8-sig')
exec(source[:source.index('\ndef make(')])
def make(m=False):
 d=Design(390 if m else 1440);w=d.w;p=24 if m else 160;cw=w-2*p;rw=342 if m else 760;rx=(w-rw)/2;sections=[]
 def heading(t):
  nonlocal y
  sections.append((t,round(y)));y+=d.text(t,p,y,30 if m else 40,cw,True)+28
 def body(t):
  nonlocal y
  y+=d.text(t,rx,y,16 if m else 18,rw)+25
 def sub(t,t2):
  nonlocal y
  d.text(t.upper(),rx,y,11,color=OLIVE);y+=31;body(t2)
 def box(title,items,checks=False):
  nonlocal y
  start=y;y+=40;inner=[];old=d.a;d.a=inner;d.text(title,p+24,y,11,color=OLIVE);y+=38
  for t in items:
   if checks:
    d.rect(p+24,y-13,13,13,BG);d.a.append(f'<rect x="{p+24}" y="{y-13}" width="13" height="13" fill="none" stroke="{OLIVE}"/>')
   y+=d.text(t,p+(50 if checks else 24),y,16 if m else 19,cw-(74 if checks else 48))+17
  y+=15;d.a=old;d.rect(p,start,cw,y-start,SAND);d.a+=inner;y+=70
 def cards(title,items):
  nonlocal y
  heading(title)
  if m:
   for im,tag,t in items:y+=d.card(im,tag,t,p,y,cw,225)+40
  else:y+=max(d.card(im,tag,t,p+j*384,y,352,235) for j,(im,tag,t) in enumerate(items))+50
  y+=30
 if m:d.text('☰',24,43,22);center(d,'home & living',44,29,240,True);d.text('SEARCH',324,41,10);y=105
 else:
  d.text('IDEAS FOR A HOME',80,69,10);d.text('THAT FEELS LIKE YOU',80,84,10);center(d,'home & living',91,50,600,True);d.text('THE WEEKLY EDIT   ↗',1080,78,10)
  for s,x in [('INTERIOR DESIGN',465),('ROOMS',585),('HOME ORGANIZATION',655),('SHOPPING',805),('SEARCH',1150)]:d.text(s,x,158,10)
  y=228
 d.text('Shopping › Buying Guides' if m else 'Home › Shopping › Buying Guides',p,y,11,color=MUTED);y+=65;center(d,'BUYING GUIDE',y,12,cw,color=OLIVE);y+=58 if m else 76
 y+=center(d,'How to Choose the Right Bedroom Lighting',y,39 if m else 62,cw,True)+18;y+=center(d,'A practical guide to lamp size, placement, light temperature and layering light in your bedroom.',y,16 if m else 20,342 if m else 820)+20
 center(d,'By Author Name · Updated Date',y,12,cw,color=MUTED);y+=48;d.rect(rx,y,rw,1,'#D6D1C5');d.text('AFFILIATE DISCLOSURE',rx,y+30,11,color=OLIVE);y+=d.text('We may earn a commission when you purchase through links on this page, at no additional cost to you.',rx,y+59,13,rw)+88
 d.photo('bedroom-modern',p,y,cw,345 if m else 600);y+=375 if m else 632;d.text('Image credit · illustrative photography',p,y,10,color=MUTED);y+=60
 body('Good bedroom lighting supports the way you use the room, from getting dressed to settling down with a book. Begin with function, then consider comfort and atmosphere. A thoughtful combination of light sources gives you more flexibility than choosing one fixture to do everything.');y+=45
 heading('Start With How You Use Your Bedroom');body('Before choosing fixtures, think about the activities that take place in the room and where you need light for each one.')
 for t in ['Reading in bed','Getting dressed','Relaxing','Working occasionally','Moving around at night']:body('• '+t)
 box('BEFORE YOU BUY',['Identify the activities that need dedicated light before choosing individual fixtures.'])
 heading('Three Types of Bedroom Lighting')
 layers=[('bedroom-modern','Ambient Lighting','General light for the room.','Ceiling fixtures · Pendants · Recessed lighting'),('lamp','Task Lighting','Focused light for reading and other activities.','Bedside lamps · Wall sconces · Reading lights'),('bedroom-soft','Accent Lighting','Atmosphere and emphasis for design features.','Picture lights · Decorative lamps · Indirect lighting')]
 for i,(im,t,desc,examples) in enumerate(layers):
  x=p if m else p+i*384;yy=y;cell=342 if m else 352;d.photo(im,x,yy,cell,230);d.text(t,x,yy+270,27,cell,True);ht=d.text(desc,x,yy+311,16,cell);d.text(examples,x,yy+331+ht,13,cell,color=MUTED)
  if m:y+=445
 if not m:y+=470
 heading('Choosing Bedside Lamp Size')
 # Original schematic; the numbered labels remain legible on mobile.
 dh=275 if m else 460;d.rect(p,y,cw,dh,SAND);scale=min(cw/800,dh/370);ox=p+(cw-800*scale)/2;oy=y+(dh-370*scale)/2
 d.a.append(f'<g transform="translate({ox} {oy}) scale({scale})" stroke="#857963" stroke-width="3"><rect x="75" y="124" width="310" height="183" rx="12" fill="#C6BAA6"/><rect x="91" y="149" width="118" height="48" rx="8" fill="#FAF8F3"/><path d="M65 207H390V295H65Z" fill="#DED4C2"/><rect x="452" y="226" width="179" height="78" fill="#B89D7E"/><path d="M466 304V326M617 304V326M542 222V151M496 149L513 91H572L589 149Z" fill="#FAF8F3"/><path d="M448 342H634M448 333V351M634 333V351M674 91V224M665 91H683M665 224H683M489 72H595M489 63V81M595 63V81M409 207V324M400 207H418M400 324H418" fill="none"/></g>')
 for n,xx,yy in [('1',541,363),('2',414,275),('3',704,166),('4',542,53),('5',220,137)]:
  d.a.append(f'<circle cx="{ox+xx*scale}" cy="{oy+yy*scale}" r="{12 if m else 17}" fill="{OLIVE}"/>');d.a.append(f'<text x="{ox+xx*scale}" y="{oy+yy*scale+5}" text-anchor="middle" font-family="Arial" font-size="{12 if m else 15}" fill="white">{n}</text>')
 y+=dh+35
 for t in ['1  Nightstand width','2  Bed and mattress height','3  Lamp height','4  Shade width','5  Your seated eye level']:body(t)
 box('QUICK TIP',['Choose a lamp in proportion to both the nightstand and the bed. Check the light from your usual seated position.'])
 heading('Where Should Bedroom Lighting Go?');d.photo('bedroom-soft',p,y,cw,330 if m else 540);y+=385 if m else 600
 for t,b in [('Bedside','Keep reading light and controls within comfortable reach. Consider whether a table lamp or wall sconce best suits the space.'),('Ceiling','Use general lighting to help you see and move around the room. Consider how it works alongside your other light sources.'),('Dresser','A secondary light can make this area more useful while adding another layer of atmosphere.'),('Reading Corner','Position focused light where you sit, with attention to glare and the location of the switch.')]:sub(t,b)
 y+=45;heading('Choosing Light Temperature')
 swatches=[('#EBD3AB','Warmer feel'),('#E8E4D6','Neutral feel'),('#D8E1E5','Cooler feel')]
 for i,(c,t) in enumerate(swatches):
  cell=(cw-24)/3;x=p+i*(cell+12);d.rect(x,y,cell,95 if m else 135,c);d.text(t,x,y+(122 if m else 165),12 if m else 18)
 y+=175 if m else 220
 sub('Warmer Light','Often chosen for a relaxed atmosphere. Consider how the light feels alongside your wall colors and textiles.')
 sub('Cooler Light','Can feel crisper. Color temperature describes the appearance of light; it does not tell you how bright a bulb is.')
 sub('Bedroom Direction','Choose comfortable illumination for relaxing, with enough focused light for reading or dressing. Check both brightness and color temperature when comparing bulbs.');y+=45
 heading('Match Lighting to Your Design Style')
 for i,(im,t,b) in enumerate([('bedroom-modern','Modern','Clean forms and simple finishes.'),('bedroom-soft','Organic Modern','Natural materials and warm texture.'),('neutral','Traditional','Classic forms and decorative detail.')]):
  x=p if m else p+i*384;cell=342 if m else 352;d.photo(im,x,y,cell,230);d.text(t,x,y+270,27,cell,True);d.text(b,x,y+307,15,cell)
  if m:y+=370
 if not m:y+=380
 body('Modern Bedroom Ideas →');body('Warm Neutral Bedroom Ideas →');y+=25
 box('BEFORE YOU BUY · MEASURE',['Nightstand width','Bed height','Available wall space','Distance to electrical outlet','Lamp clearance'],True)
 heading('Common Bedroom Lighting Mistakes')
 for t,b in [('Using Only One Light Source','A single ceiling fixture may not support every activity. Plan a combination of general and focused lighting.'),('Choosing a Lamp That Is Too Large','Consider the shade as well as the base. Leave enough space for the everyday objects you keep beside the bed.'),('Ignoring Reading Needs','Decorative lighting may not direct enough light onto a page. Consider a dedicated task light where it is useful.'),('Forgetting Controls','Check that switches are easy to reach from the places where you actually use the light.')]:sub(t,b)
 y+=45;heading('A Few Options to Consider')
 for i,(label,name,pro,con,desc,best) in enumerate([('Best for Small Bedrooms','Compact Bedside Lamp','Uses less surface space','Check the shade width','A compact design can leave more room for bedside essentials. Compare its full dimensions with the space you measured.','Narrow nightstands'),('Best for Reading','Adjustable Reading Light','Directs light toward a task','Check adjustment range','An adjustable design can help position light where you read. Consider the location of both the switch and the beam.','A dedicated reading spot'),('Best for a Modern Look','Sculptural Table Lamp','Adds a visual focal point','May need more surface area','A simple sculptural form can complement a contemporary room. Balance the decorative shape with the lighting function you need.','Contemporary bedrooms')]):
  d.rect(rx,y,rw,1,'#D6D1C5');y+=39;d.text(label.upper(),rx,y,11,color=OLIVE);y+=42;y+=d.text(name,rx,y,31 if m else 39,rw,True)+18
  if i==1:art(d,'sconce',rx,y,rw,270 if m else 350)
  else:lamp_art(d,'lamp',2 if i==0 else 3,rx,y,rw,270 if m else 350)
  y+=295 if m else 375;d.rect(rx,y,342 if m else 292,50,OLIVE);d.text('CHECK PRICE AT AMAZON ↗',rx+20,y+31,12,color='#FFFFFF');y+=84
  sub('Pros','+ '+pro);sub('Cons / What to Know','– '+con);sub('Why It Fits',desc);sub('Best For',best);sub('Details','Product specifications to be verified.');y+=35
 box('READY TO COMPARE OPTIONS?',['7 Best Bedside Lamps for Beautiful Bedrooms','Compare options for different room sizes, budgets and styles.','See Our Picks →'])
 heading('Bedroom Lighting Checklist');box('BEFORE YOU DECIDE',['Identify your lighting needs','Plan ambient lighting','Add task lighting where needed','Measure the nightstand','Check lamp scale','Consider light temperature','Match the fixture to the room style','Check outlet placement'],True)
 cards('More Buying Guides',[('neutral','Buying Guide','How to Choose a Bedroom Rug'),('bedroom-soft','Buying Guide','How to Choose Bedding'),('bedroom-modern','Buying Guide','How to Choose a Bed Frame')])
 cards('Bedroom Inspiration',[('bedroom-modern','Bedroom','15 Modern Luxury Bedroom Ideas'),('neutral','Bedroom','12 Warm Neutral Bedroom Ideas'),('bedroom-soft','Bedroom','15 Small Bedroom Ideas')])
 heading('More to Discover');body('Amazon Bedroom Finds →');body('Bedroom Decor Finds →');y+=50
 nh=390 if m else 295;d.rect(0,y,w,nh,OLIVE);center(d,'Make Better Home Choices',y+68,32 if m else 44,cw,True,'#FFFFFF');center(d,'Design ideas, buying advice and curated home finds.',y+(164 if m else 120),15,cw,color='#FFFFFF')
 if m:d.rect(24,y+243,342,48,BG);d.text('Email address',40,y+273,15);d.rect(24,y+306,342,48,'#DED5C4');center(d,'SIGN UP →',y+336,13,cw)
 else:d.rect(320,y+180,610,54,BG);d.text('Email address',340,y+213,16);d.rect(948,y+180,172,54,'#DED5C4');d.text('SIGN UP →',980,y+213,14)
 y=footer(d,y+nh,m);name='mobile' if m else 'desktop';svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{round(y)}" viewBox="0 0 {w} {round(y)}"><title>Wireframe 6 — Buying Guide — {name}</title><rect width="{w}" height="{round(y)}" fill="{BG}"/>'+''.join(d.a)+'</svg>';(OUT/f'buying-guide-wireframe-6-{name}.svg').write_text(svg,encoding='utf-8');return {'height':round(y),'sections':sections}
stats={'desktop':make(),'mobile':make(True)}
Path('work/guide-layout.json').write_text(json.dumps(stats,indent=2))
(OUT/'buying-guide-wireframe-6-preview.html').write_text('''<!doctype html><meta charset="utf-8"><title>Wireframe 6 — Buying Guide</title><style>body{margin:0;background:#dedbd3;font:15px Arial;color:#292b25}header{padding:24px 4%;background:#faf8f3}main{display:flex;gap:28px;padding:30px;align-items:flex-start}figure{margin:0}img{width:100%;display:block}.desktop{width:75%}.mobile{width:22%}figcaption{padding:16px 0}a{color:#46513e}</style><header><b>Wireframe 6 — Buying Guide</b><p>Education first · lighting layers · original sizing diagram · placement and temperature · style · measurement checklist · common mistakes · three supporting products · related guides · full footer.</p><p>Design sample with illustrative photography, product concepts and author details. Product specifications are unverified. The affiliate disclosure is shown for the affiliate-enabled version; omit it when a guide has no affiliate links. No table of contents.</p><a href="buying-guide-wireframe-6-desktop.svg">Open desktop at full size</a> · <a href="buying-guide-wireframe-6-mobile.svg">Open mobile at full size</a></header><main><figure class="desktop"><figcaption>DESKTOP · 1440 PX</figcaption><img src="buying-guide-wireframe-6-desktop.svg"></figure><figure class="mobile"><figcaption>MOBILE · 390 PX</figcaption><img src="buying-guide-wireframe-6-mobile.svg"></figure></main>''',encoding='utf-8')
print(json.dumps(stats))
