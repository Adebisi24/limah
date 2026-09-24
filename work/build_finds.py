from pathlib import Path
import html,textwrap,json
exec(Path('work/build_wireframe.py').read_text(encoding='utf-8').split('latest=')[0])
src=Path('work/build_inspiration.py').read_text(encoding='utf-8')
exec(src[src.index('def center('):src.index('def save(')])
exec(src[src.index('def footer('):src.index('def make(')])
products=[
('Ceramic Bedside Lamp','Lighting','A soft silhouette can bring a quieter finish to the bedside. Pair it with a shade that keeps the light comfortable for winding down.','Soft visual texture','Check shade dimensions','Bedside ambient lighting','lamp'),
('Under-Bed Storage Bags','Storage','Make use of the space below the bed for seasonal textiles. Measure the clearance first and choose a format that is easy to pull out.','Uses overlooked space','Requires bed clearance','Seasonal bedding','storage'),
('Textured Throw Blanket','Bedding & Textiles','A textured throw adds another layer to simple bedding. Choose a weight that suits your climate and a color that connects with the rest of the room.','Adds texture','Check care requirements','A layered bed','throw'),
('Bedside Organizer','Storage','Keep small everyday objects together with a dedicated bedside organizer. Choose compartments around the things you actually reach for each evening.','Keeps essentials together','Uses surface space','Tidier nightstands','tray'),
('Plug-In Wall Sconce','Lighting','A wall-mounted light can free up the bedside surface. Plan the cable route and mounting position before choosing a fixture.','Frees bedside space','Needs suitable mounting','Compact bedrooms','sconce'),
('Upholstered Storage Bench','Storage','A bench can provide a place to sit and a home for spare textiles. Leave enough room to walk comfortably around the bed.','Combines seating and storage','Needs floor space','Larger bedroom layouts','bench'),
('Neutral Bedding Set','Bedding & Textiles','A coordinated bedding set gives the room a calm foundation. Confirm the material, mattress fit and included pieces before ordering.','Creates a cohesive base','Check what is included','Refreshing the bed','bedding'),
('Soft Area Rug','Bedding & Textiles','A rug helps connect the bed with surrounding furniture. Mark out its dimensions before buying so the placement works on both sides.','Softens the room','May need a rug pad','A comfortable landing','rug'),
('Arched Mirror','Decor','A mirror can brighten the feel of a corner and provide a useful dressing spot. Check its weight and the recommended securing method.','Useful and decorative','Secure as directed','A dressing corner','mirror'),
('Framed Wall Art','Decor','Choose a quiet composition that works with your room palette. One well-scaled piece can be enough above a dresser or beside the bed.','Adds a focal point','Check frame inclusion','Personalizing plain walls','art'),
('Sculptural Vase','Decor','A simple vase brings shape to a bedside table or dresser. Leave room around it so the arrangement feels considered and easy to maintain.','Adds sculptural interest','Check water suitability','A restrained display','vase'),
('Wood Bedside Table','Useful Extras','A practical bedside table puts a useful surface within reach. Compare its height with the mattress and consider how much storage you need.','Adds a useful surface','Check height and assembly','Bedside essentials','table'),
('Lidded Woven Basket','Useful Extras','A lidded basket gives loose textiles a defined place. Check the interior dimensions against the things you plan to store.','Conceals everyday clutter','Check usable capacity','Spare throws and cushions','basket'),
('Room-Darkening Curtains','Useful Extras','Curtains can soften a room and help manage incoming light. Check the fabric description, panel width and drop against your windows.','Adds softness and privacy','Measure panels carefully','Window dressing','curtain'),
('Decorative Cushion Cover','Useful Extras','A cushion cover is a small way to introduce a new texture or color. Coordinate it with existing bedding and check the insert size.','Easy visual refresh','Insert may be separate','Layering an existing bed','cushion')]
def art(d,kind,x,y,w,h):
 d.rect(x,y,w,h,'#F0EDE6');scale=min(w/400,h/300);ox=x+(w-400*scale)/2;oy=y+(h-300*scale)/2
 shapes={
 'lamp':'<path d="M130 135L153 50H247L270 135Z" fill="#DDD2BC"/><path d="M179 160Q160 212 175 239H225Q240 212 221 160Z" fill="#B6A388"/><path d="M200 135V160M165 243H235"/>',
 'storage':'<path d="M80 130L123 95H290L328 130V220H80Z" fill="#C2B7A4"/><path d="M80 130H328M125 170H280M170 190H230"/>',
 'throw':'<path d="M105 70H280L302 224H126Z" fill="#C7B49B"/><path d="M130 90L150 214M165 90L185 214M200 90L220 214M235 90L255 214M128 226L130 243M155 226L157 243M185 226L187 243M215 226L217 243M245 226L247 243M275 226L277 243"/>',
 'tray':'<path d="M91 170L130 125H277L314 170V213H91Z" fill="#BDA786"/><path d="M91 170H314M163 170V210M245 170V210M145 124V94H182V124M220 123V82H257V123"/>',
 'sconce':'<path d="M125 86H143V186H125ZM143 110H222V80" fill="#B3A181"/><path d="M193 80H252L276 151H169Z" fill="#DED5C3"/><path d="M135 188V245"/>',
 'bench':'<rect x="75" y="122" width="250" height="72" rx="15" fill="#CCBCA5"/><path d="M89 196V241M311 196V241M77 153H324"/>',
 'bedding':'<rect x="93" y="50" width="214" height="204" rx="12" fill="#DED5C3"/><rect x="107" y="68" width="84" height="48" rx="8" fill="#F8F5EE"/><rect x="209" y="68" width="84" height="48" rx="8" fill="#F8F5EE"/><path d="M93 129H307M93 218H307"/>',
 'rug':'<path d="M109 63H291L328 243H73Z" fill="#C9BBA4"/><path d="M122 83H278L306 223H94ZM185 115L222 154L193 197L158 157Z" fill="none"/>',
 'mirror':'<path d="M128 252V105A72 72 0 0 1 144 0V252Z" fill="#C9D0CA"/><path d="M140 250V107A60 60 0 0 1 120 0V250M159 194L231 95" fill="none"/>',
 'art':'<rect x="109" y="46" width="182" height="208" fill="#AD9576"/><rect x="122" y="59" width="156" height="182" fill="#E4DAC6"/><circle cx="200" cy="129" r="39" fill="#A5AD98"/><path d="M146 215L194 140L256 215Z" fill="#C4AE8F"/>',
 'vase':'<path d="M174 83H226L218 126Q284 208 235 246H165Q116 208 182 126Z" fill="#BEAB91"/><path d="M199 83V38M199 64L172 39M199 49L223 26"/>',
 'table':'<rect x="112" y="91" width="176" height="128" fill="#BB9F7D"/><path d="M112 152H288M127 219V258M273 219V258M188 123H211M188 184H211"/>',
 'basket':'<path d="M113 113H287L269 237H131Z" fill="#C5AD87"/><path d="M107 101H293V117H107ZM142 139H276M137 167H274M131 198H268M149 121L161 233M186 121L190 233M226 121L219 233M257 121L246 233M177 99V83H225V99" fill="none"/>',
 'curtain':'<path d="M95 54H305M109 61H192V247H109ZM209 61H292V247H209Z" fill="#CEC4B2"/><path d="M129 62V246M154 62V246M177 62V246M229 62V246M253 62V246M277 62V246"/>',
 'cushion':'<path d="M116 73Q200 90 284 73Q267 150 284 227Q200 210 116 227Q133 150 116 73Z" fill="#ADA98F"/><path d="M136 94Q200 106 264 94M136 206Q200 193 264 206" fill="none"/>'}
 d.a.append(f'<g transform="translate({ox} {oy}) scale({scale})" stroke="#857963" stroke-width="2" stroke-linejoin="round">{shapes[kind]}</g>')
def make(m=False):
 d=Design(390 if m else 1440);w=d.w;p=24 if m else 160;cw=w-2*p;rw=342 if m else 760;rx=(w-rw)/2;positions=[]
 if m:d.text('☰',24,43,22);center(d,'home & living',44,29,240,True);d.text('SEARCH',324,41,10);y=105
 else:
  d.text('IDEAS FOR A HOME',80,69,10);d.text('THAT FEELS LIKE YOU',80,84,10);center(d,'home & living',91,50,600,True);d.text('THE WEEKLY EDIT   ↗',1080,78,10)
  for s,x in [('INTERIOR DESIGN',465),('ROOMS',585),('HOME ORGANIZATION',655),('SHOPPING',805),('SEARCH',1150)]:d.text(s,x,158,10)
  y=228
 d.text('Shopping › Shopping Finds' if m else 'Home › Shopping › Shopping Finds',p,y,11,color=MUTED);y+=65;center(d,'SHOPPING FINDS',y,12,cw,color=OLIVE);y+=58 if m else 76
 y+=center(d,'15 Amazon Bedroom Finds Worth Discovering',y,39 if m else 62,cw,True)+18
 y+=center(d,'Stylish and practical finds for creating a more comfortable, organized and beautiful bedroom.',y,16 if m else 20,342 if m else 820)+20
 center(d,'By Author Name · Updated Date',y,12,cw,color=MUTED);y+=48
 d.rect(rx,y,rw,1,'#D6D1C5');d.text('AFFILIATE DISCLOSURE',rx,y+30,11,color=OLIVE);hh=d.text('We may earn a commission when you purchase through links on this page, at no additional cost to you.',rx,y+59,13,rw);y+=hh+88
 d.photo('bedroom-soft',p,y,cw,345 if m else 600);y+=375 if m else 632;d.text('Image credit · illustrative photography',p,y,10,color=MUTED);y+=60
 y+=d.text('Thoughtful lighting, useful storage and soft textiles can make a bedroom feel more comfortable. These fifteen find concepts show how small additions can support the way you use your room, while keeping the overall look calm and cohesive.',rx,y,16 if m else 18,rw)+60
 d.text('Our Finds',p,y,30 if m else 40,serif=True);y+=42
 for row in range(2 if m else 1):
  items=[(0,'Lamp'),(1,'Storage'),(2,'Textiles'),(11,'Nightstand')][row*2:row*2+2] if m else [(0,'Lamp'),(1,'Storage'),(2,'Textiles'),(11,'Nightstand')]
  cell=163 if m else 262
  for j,(i,label) in enumerate(items):
   x=p+j*(179 if m else 286);d.a.append(f'<a href="#find-{i+1}">');art(d,products[i][6],x,y,cell,145 if m else 195);d.text(label+' ↓',x,y+(175 if m else 229),19,serif=True);d.a.append('</a>')
  y+=215 if m else 275
 y+=35
 for i,(name,group,body,pro,con,best,kind) in enumerate(products,1):
  positions.append({'product':i,'y':round(y)});d.a.append(f'<g id="find-{i}"><title>{html.escape(name)}</title>');d.rect(p,y,cw,1,'#D6D1C5');y+=41;d.text(f'{i:02}  /  {group.upper()}',rx,y,11,color=OLIVE);y+=43
  y+=d.text(name,rx,y,32 if m else 43,rw,True)+20;art(d,kind,rx,y,rw,290 if m else 420);y+=315 if m else 445
  d.rect((w-292)/2,y,292,52,OLIVE);center(d,'CHECK PRICE AT AMAZON ↗',y+32,12,292,color='#FFFFFF');y+=85
  d.text('WHY WE LIKE IT',rx,y,11,color=OLIVE);y+=32;y+=d.text(body,rx,y,16 if m else 18,rw)+26
  y+=60;d.a.append('</g>')
  if i==5:
   th=220 if m else 175;d.rect(p,y,cw,th,SAND);d.text('BEDROOM TIP',p+24,y+40,11,color=OLIVE);d.text('Choose accessories that improve comfort, storage or visual cohesion. Leave room for the things you already love.',p+24,y+81,20 if m else 25,cw-48,True);y+=th+85
 def cards(title,titles,key,tag):
  nonlocal y
  y+=d.text(title,p,y,30 if m else 39,cw,True)+25;d.a.append(f'<g id="{key}">')
  items=[('bedroom-soft' if i%2==0 else 'bedroom-modern',t) for i,t in enumerate(titles)]
  if m:
   for im,t in items:
    d.a.append('<g data-related-card="true">');d.rect(p,y,cw,1,'#D6D1C5');d.photo(im,p,y+18,120,105);d.text(tag.upper(),160,y+31,10,206,color=OLIVE);ht=d.text(t,160,y+61,21,206,True);d.a.append('</g>');y+=max(145,ht+85)
  else:
   for r in range(0,len(items),4):
    heights=[]
    for j,(im,t) in enumerate(items[r:r+4]):
     d.a.append('<g data-related-card="true">');heights.append(d.card(im,tag,t,p+j*286,y,262,180));d.a.append('</g>')
    y+=max(heights)+45
  d.a.append('</g>');y+=65
 cards('More Bedroom Finds',['Small Bedroom Finds','Affordable Bedroom Decor Finds','Bedroom Organization Finds','Cozy Bedroom Finds','Bedside Lighting Finds','Warm Neutral Bedroom Finds','Small-Space Storage Finds','Bedding Finds Worth Discovering','Bedroom Rug Finds','Bedroom Wall Decor Finds','Nightstand Finds','Bedroom Curtain Finds'],'related-finds','Shopping Finds')
 d.rect(p,y,cw,265 if m else 210,SAND);d.text('NEED HELP CHOOSING?',p+24,y+41,11,color=OLIVE);d.text('7 Best Bedside Lamps for Beautiful Bedrooms →',p+24,y+87,23 if m else 29,cw-48,True);d.text('How to Choose Bedroom Lighting →',p+24,y+(203 if m else 156),19,cw-48,True);y+=355 if m else 300
 cards('More Bedroom Inspiration',['15 Modern Luxury Bedroom Ideas','15 Small Bedroom Ideas','12 Warm Neutral Bedroom Ideas','Minimalist Bedroom Ideas','Bedroom Lighting Ideas','Small Bedroom Layout Ideas','Cozy Bedroom Decorating Ideas','Bedroom Storage Ideas'],'related-inspiration','Bedroom')
 nh=390 if m else 295;d.rect(0,y,w,nh,OLIVE);center(d,'Get Our Latest Home Finds',y+68,32 if m else 44,cw,True,'#FFFFFF');center(d,'Beautiful interiors, useful products and organization ideas.',y+(164 if m else 120),15,cw,color='#FFFFFF')
 if m:d.rect(24,y+243,342,48,BG);d.text('Email address',40,y+273,15);d.rect(24,y+306,342,48,'#DED5C4');center(d,'SIGN UP →',y+336,13,cw)
 else:d.rect(320,y+180,610,54,BG);d.text('Email address',340,y+213,16);d.rect(948,y+180,172,54,'#DED5C4');d.text('SIGN UP →',980,y+213,14)
 y=footer(d,y+nh,m);name='mobile' if m else 'desktop';svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{round(y)}" viewBox="0 0 {w} {round(y)}"><title>Wireframe 4 — Shopping Finds Article — {name}</title><rect width="{w}" height="{round(y)}" fill="{BG}"/>'+''.join(d.a)+'</svg>';(OUT/f'shopping-finds-wireframe-4-{name}.svg').write_text(svg,encoding='utf-8');return {'height':round(y),'products':positions}
stats={'desktop':make(),'mobile':make(True)}
Path('work/finds-layout.json').write_text(json.dumps(stats,indent=2))
(OUT/'shopping-finds-wireframe-4-preview.html').write_text('''<!doctype html><meta charset="utf-8"><title>Wireframe 4 — Shopping Finds Article</title><style>body{margin:0;background:#dedbd3;font:15px Arial;color:#292b25}header{padding:24px 4%;background:#faf8f3}main{display:flex;gap:28px;padding:30px;align-items:flex-start}figure{margin:0}img{width:100%;display:block}.desktop{width:75%}.mobile{width:22%}figcaption{padding:16px 0}a{color:#46513e}</style><header><b>Wireframe 4 — Shopping Finds Article</b><p>15 finds · centered retailer buttons · 12 related finds and 8 inspiration articles · four-column desktop grids · side-by-side mobile related cards · full footer.</p><p>Design concepts only: vector product illustrations, descriptions and author details are placeholders, not verified Amazon listings or recommendations. Retailer buttons demonstrate the no-price fallback. Lifestyle photography is illustrative.</p><a href="shopping-finds-wireframe-4-desktop.svg">Open desktop at full size</a> · <a href="shopping-finds-wireframe-4-mobile.svg">Open mobile at full size</a></header><main><figure class="desktop"><figcaption>DESKTOP · 1440 PX</figcaption><img src="shopping-finds-wireframe-4-desktop.svg"></figure><figure class="mobile"><figcaption>MOBILE · 390 PX</figcaption><img src="shopping-finds-wireframe-4-mobile.svg"></figure></main>''',encoding='utf-8')
print(json.dumps(stats))

