from pathlib import Path
import html,textwrap,json
source=Path('work/build_finds.py').read_text(encoding='utf-8-sig')
exec(source[:source.index('products=[')])
exec(source[source.index('def art('):source.index('def make(',source.index('def art('))])
picks=[
('Best Overall','Ceramic Table Lamp','Everyday bedside lighting','Balanced proportions','Needs a suitable surface','A softly shaped ceramic lamp can work with a range of bedroom styles. Look for a shade that diffuses the light comfortably and a base that leaves room for everyday essentials.','Check the full shade width as well as the base before deciding whether it fits your nightstand.','lamp'),
('Best Budget','Simple Table Lamp','An affordable refresh','Straightforward design','Check included accessories','A simple table lamp can provide a useful finishing touch without dominating the room. Consider the total cost, including any bulb or shade that must be purchased separately.','Price alone does not establish value. Confirm the materials, electrical specifications and return conditions.','lamp'),
('Best for Small Bedrooms','Compact Bedside Lamp','Narrow nightstands','Smaller visual footprint','May offer less coverage','A compact lamp leaves more room for a book, water glass and other essentials. Check both the shade diameter and the base footprint to understand how much space it uses.','A small lamp still needs to put light where you want it. Compare its height with the mattress and your reading position.','lamp'),
('Best Modern','Sculptural Table Lamp','Contemporary interiors','Strong geometric shape','A more prominent silhouette','A sculptural lamp can act as a small focal point in a restrained bedroom. Repeat one of its finishes elsewhere to connect it with the rest of the room.','Consider how the form looks when switched off as well as how it directs light when in use.','lamp'),
('Best Minimalist','Slim Metal Lamp','A visually quiet bedside','Restrained profile','Check shade adjustability','A slim lamp can suit a pared-back room where every object has a purpose. Pay attention to the switch position and whether the light is comfortable for your usual activities.','A narrow profile does not guarantee a small base. Compare the complete dimensions with your available surface.','lamp'),
('Best Statement Lamp','Oversized Ceramic Lamp','Larger nightstands','Decorative focal point','Requires more surface area','A substantial lamp can balance a wide bed or a generous bedside table. Keep nearby objects simple so the overall arrangement remains calm.','Mark out the shade width before buying. Large lamps can crowd a surface even when their bases seem modest.','lamp'),
('Best Space-Saving','Plug-In Wall Sconce','Freeing bedside space','Leaves the surface clear','Needs mounting and cable planning','A wall-mounted light moves the fixture off the nightstand. Think through the mounting position, cable route and access to the switch before selecting a design.','Confirm the installation requirements and the suitability of the wall and electrical connection.','sconce')]
def lamp_art(d,kind,i,x,y,w,h):
 if i==6:return art(d,'sconce',x,y,w,h)
 d.rect(x,y,w,h,'#F0EDE6');s=min(w/400,h/300);ox=x+(w-400*s)/2;oy=y+(h-300*s)/2
 colors=['#C3AD8F','#D7C7AF','#ABA68E','#B39B80','#8C9284','#C9BAA1'];col=colors[i];bw=[48,28,32,60,10,69][i];shade=[88,72,59,69,59,101][i]
 shape=f'<path d="M{200-shade} 133L{200-shade*.62} 51H{200+shade*.62}L{200+shade} 133Z" fill="#DED4C1"/><path d="M200 133V167"/>'
 if i in [1,4]:shape+=f'<path d="M{200-bw/2} 158H{200+bw/2}V236H{200-bw/2}Z" fill="{col}"/><path d="M162 240H238"/>'
 elif i==3:shape+=f'<path d="M200 154L{200+bw} 236H{200-bw}Z" fill="{col}"/>'
 else:shape+=f'<path d="M181 153H219Q{200+bw+28} 216 {200+bw*.65} 239H{200-bw*.65}Q{200-bw-28} 216 181 153Z" fill="{col}"/>'
 d.a.append(f'<g transform="translate({ox} {oy}) scale({s})" stroke="#827661" stroke-width="2" stroke-linejoin="round">{shape}</g>')
def make(m=False,button_count=3):
 d=Design(390 if m else 1440);w=d.w;p=24 if m else 160;cw=w-2*p;rw=342 if m else 760;rx=(w-rw)/2;positions=[]
 def heading(t,y):return y+d.text(t,p,y,30 if m else 40,cw,True)+25
 def cta(x,y,width,count=None):
  count=button_count if count is None else count
  stacked=m or width<600;bw=min(292,width) if stacked else min(292,(width-12*(count-1))/count)
  for j,label in enumerate(['CHECK PRICE AT AMAZON ↗','CHECK PRICE AT RETAILER 2 ↗','CHECK PRICE AT RETAILER 3 ↗'][:count]):
   bx=x+(width-bw)/2 if stacked else x+(width-(bw*count+12*(count-1)))/2+j*(bw+12);by=y+j*62 if stacked else y
   d.rect(bx,by,bw,50,OLIVE);d.a.append(f'<text x="{bx+bw/2}" y="{by+31}" text-anchor="middle" font-family="Arial" font-size="11" fill="#FFFFFF">{label}</text>')
  return count*62-12 if stacked else 50
 if m:d.text('☰',24,43,22);center(d,'home & living',44,29,240,True);d.text('SEARCH',324,41,10);y=105
 else:
  d.text('IDEAS FOR A HOME',80,69,10);d.text('THAT FEELS LIKE YOU',80,84,10);center(d,'home & living',91,50,600,True);d.text('THE WEEKLY EDIT   ↗',1080,78,10)
  for s,x in [('INTERIOR DESIGN',465),('ROOMS',585),('HOME ORGANIZATION',655),('SHOPPING',805),('SEARCH',1150)]:d.text(s,x,158,10)
  y=228
 d.text('Shopping › Best Products' if m else 'Home › Shopping › Best Products',p,y,11,color=MUTED);y+=65;center(d,'BEST PRODUCTS',y,12,cw,color=OLIVE);y+=58 if m else 76
 y+=center(d,'7 Best Bedside Lamps for Beautiful Bedrooms',y,39 if m else 62,cw,True)+18
 y+=center(d,'Stylish lighting options for reading, small spaces, warm ambience and different bedroom aesthetics.',y,16 if m else 20,342 if m else 820)+20
 center(d,'By Author Name · Updated Date',y,12,cw,color=MUTED);y+=48;d.rect(rx,y,rw,1,'#D6D1C5');d.text('AFFILIATE DISCLOSURE',rx,y+30,11,color=OLIVE);y+=d.text('We may earn a commission when you purchase through links on this page, at no additional cost to you.',rx,y+59,13,rw)+88
 d.photo('bedroom-modern',p,y,cw,345 if m else 600);y+=375 if m else 632;d.text('Image credit · illustrative photography',p,y,10,color=MUTED);y+=60
 y+=d.text('The right bedside lamp should suit the space you have and the way you use your bedroom. This guide brings together seven lighting concepts for different needs, with attention to proportions, practical details and the trade-offs to consider before buying.',rx,y,16 if m else 18,rw)+65
 y=heading('Our Quick Picks',y)
 for i,(label,name,best,pro,con,body,note,kind) in enumerate(picks[:4]):
  if m:
   d.rect(p,y,cw,365,SAND);lamp_art(d,kind,i,p+18,y+18,cw-36,155);d.text(label.upper(),p+18,y+204,10,color=OLIVE);d.a.append(f'<a href="#pick-{i+1}">');d.text(name+' ↓',p+18,y+237,25,cw-36,True);d.a.append('</a>');cta(p+18,y+291,cw-36,count=1);y+=385
  else:
   d.rect(p,y,cw,1,'#D6D1C5');lamp_art(d,kind,i,p,y+17,170,128);d.text(label.upper(),p+198,y+48,11,color=OLIVE);d.a.append(f'<a href="#pick-{i+1}">');d.text(name+' ↓',p+198,y+92,29,580,True);d.a.append('</a>');cta(w-p-228,y+50,228,count=1);y+=164
 y+=80
 for i,(label,name,best,pro,con,body,note,kind) in enumerate(picks):
  positions.append((label,round(y)));d.a.append(f'<g id="pick-{i+1}"><title>{html.escape(label)}</title>');d.rect(p,y,cw,1,'#D6D1C5');y+=43;d.text(label.upper(),rx,y,11,color=OLIVE);y+=47;y+=d.text(name,rx,y,32 if m else 43,rw,True)+20
  lamp_art(d,kind,i,rx,y,rw,290 if m else 420);y+=315 if m else 445;button_height=cta(rx,y,rw);y+=button_height+38
  if m:
   d.text('PROS',rx,y,11,color=OLIVE);y+=30;y+=d.text('+ '+pro,rx,y,15,rw)+25;d.text('CONS',rx,y,11,color=OLIVE);y+=30;y+=d.text('– '+con,rx,y,15,rw)+34
  else:
   d.text('PROS',rx,y,11,color=OLIVE);d.text('CONS',rx+400,y,11,color=OLIVE);d.text('+ '+pro,rx,y+31,16,350);d.text('– '+con,rx+400,y+31,16,350);y+=85
  d.text('WHY WE RECOMMEND IT',rx,y,11,color=OLIVE);y+=32;y+=d.text(body,rx,y,16 if m else 18,rw)+26;d.text('BEST FOR',rx,y,11,color=OLIVE);y+=29;y+=d.text(best,rx,y,16,rw)+28
  d.text('KEY DETAILS',rx,y,11,color=OLIVE);y+=29
  for field in ['Dimensions','Material','Light source','Power','Colors']:
   d.rect(rx,y,rw,1,'#DDD7CC');d.text(field,rx,y+24,13);d.text('To be verified',rx+(170 if m else 400),y+24,13,color=MUTED);y+=40
  y+=32;d.text('WHAT TO KNOW',rx,y,11,color=OLIVE);y+=31;y+=d.text(note,rx,y,15 if m else 17,rw)+80;d.a.append('</g>')
 y=heading('Compare Our Picks',y)
 if m:
  for label,name,best,*rest in picks:
   d.rect(p,y,cw,1,'#D6D1C5');y+=34;y+=d.text(name,p,y,24,cw,True)+15;y+=d.text('Best for: '+best,p,y,14,cw)+12;d.text('Dimensions: To be verified',p,y,13,color=MUTED);y+=29;d.text('Retailer: Amazon (placeholder)',p,y,13,color=MUTED);y+=45
 else:
  cols=[p,p+342,p+657,p+897];d.rect(p,y,cw,50,SAND)
  for x,t in zip(cols,['PRODUCT','BEST FOR','SIZE','RETAILER']):d.text(t,x+12,y+31,11,color=OLIVE)
  y+=50
  for label,name,best,*rest in picks:
   for x,t,sz,ww in zip(cols,[name,best,'To be verified','Amazon*'],[18,15,14,14],[310,280,210,170]):d.text(t,x+12,y+34,sz,ww,sz==18)
   y+=80;d.rect(p,y,cw,1,'#D6D1C5')
  d.text('* Retailer placeholders; listings and specifications have not been verified.',p,y+30,12,color=MUTED);y+=60
 y+=65;y=heading('How We Selected',y);y+=d.text('Selection-methodology placeholder: the final article should explain how the shortlisted products were assessed, including the sources consulted and any first-hand testing actually performed.',rx,y,16 if m else 18,rw)+24
 for s in ['Size and nightstand footprint','Lighting function and materials','Design versatility and specifications','Retailer information and bedroom needs']:
  y+=d.text('• '+s,rx,y,16,rw)+15
 y+=d.text('This design uses illustrative product concepts. No hands-on testing or verified product assessment is claimed.',rx,y+12,14,rw,color=MUTED)+80
 y=heading('What to Look for in a Bedside Lamp',y)
 for title,body in [('Size','Choose proportions that work with both your bed and your nightstand. Check the shade width as well as the base.'),('Light Output','Consider whether you need focused reading light, softer ambient light or a combination of both.'),('Height','Check the shade position from your usual seated or lying position so the light feels comfortable.'),('Style','Choose a finish and silhouette that complements the room. Think about how the lamp looks during daylight too.')]:
  d.text(title.upper(),rx,y,11,color=OLIVE);y+=32;y+=d.text(body,rx,y,16 if m else 18,rw)+37
 y+=25;bh=290 if m else 235;d.rect(p,y,cw,bh,SAND);d.text('NEED MORE HELP?',p+24,y+38,11,color=OLIVE);d.text('How to Choose the Right Bedroom Lighting →',p+24,y+82,27 if m else 35,cw-48,True);d.text('Learn about lamp height, placement, light temperature and layering bedroom lighting.',p+24,y+(205 if m else 165),15,cw-48);y+=bh+100
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
 cards('More Bedroom Shopping',['Amazon Bedroom Finds','Bedroom Organization Finds','Shop This Modern Luxury Bedroom','Small Bedroom Finds','Cozy Bedroom Finds','Bedroom Lighting Finds','Best Bedroom Organizers','Best Under-Bed Storage','How to Choose Bedroom Lighting','How to Choose a Bedroom Rug','How to Choose Bedding','Warm Neutral Bedroom Finds'],'related-shopping','Bedroom Shopping')
 cards('More Bedroom Inspiration',['15 Modern Luxury Bedroom Ideas','12 Warm Neutral Bedroom Ideas','15 Small Bedroom Ideas','Minimalist Bedroom Ideas','Bedroom Lighting Ideas','Small Bedroom Layout Ideas','Cozy Bedroom Decorating Ideas','Bedroom Storage Ideas'],'related-inspiration','Bedroom')

 nh=390 if m else 295;d.rect(0,y,w,nh,OLIVE);center(d,'Shop Smarter for Your Home',y+68,32 if m else 44,cw,True,'#FFFFFF');center(d,'Design ideas, practical buying advice and curated finds.',y+(164 if m else 120),15,cw,color='#FFFFFF')
 if m:d.rect(24,y+243,342,48,BG);d.text('Email address',40,y+273,15);d.rect(24,y+306,342,48,'#DED5C4');center(d,'SIGN UP →',y+336,13,cw)
 else:d.rect(320,y+180,610,54,BG);d.text('Email address',340,y+213,16);d.rect(948,y+180,172,54,'#DED5C4');d.text('SIGN UP →',980,y+213,14)
 y=footer(d,y+nh,m);name=('mobile' if m else 'desktop')+('' if button_count==3 else f'-{button_count}-buttons');svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{round(y)}" viewBox="0 0 {w} {round(y)}"><title>Wireframe 5 — Best Products — {name}</title><rect width="{w}" height="{round(y)}" fill="{BG}"/>'+''.join(d.a)+'</svg>';(OUT/f'best-products-wireframe-5-{name}.svg').write_text(svg,encoding='utf-8');return {'height':round(y),'picks':positions}
stats={'desktop':make(),'mobile':make(True)}
for button_count in [1,2]:
 make(False,button_count);make(True,button_count)
Path('work/best-layout.json').write_text(json.dumps(stats,indent=2))
(OUT/'best-products-wireframe-5-preview.html').write_text('''<!doctype html><meta charset="utf-8"><title>Wireframe 5 — Best Products</title><style>body{margin:0;background:#dedbd3;font:15px Arial;color:#292b25}header{padding:24px 4%;background:#faf8f3}main{display:flex;gap:28px;padding:30px;align-items:flex-start}figure{margin:0}img{width:100%;display:block}.desktop{width:75%}.mobile{width:22%}figcaption{padding:16px 0}a{color:#46513e}</style><header><b>Wireframe 5 — Best Products</b><p>Quick Picks · seven recommendations · agreed product order · comparison table / mobile cards · selection methodology · buying advice · 12 shopping articles and 8 inspiration articles · four-column desktop grids · side-by-side mobile related cards · newsletter · complete footer.</p><p>Design sample only. Products, illustrations, retailer assignments, pros/cons and author details are placeholders. Specifications remain unverified; no product testing is claimed. Buttons show the no-price fallback. Retailer 2 and Retailer 3 are editable retailer placeholders. Figma-importable SVGs.</p><label>Buttons per full product section: <select id="button-count"><option value="1">1 button</option><option value="2">2 buttons</option><option value="3" selected>3 buttons</option></select></label><p>Quick Picks always show one button. Full product sections use centered buttons: a row on desktop, a stack on mobile.</p><a id="desktop-link" href="best-products-wireframe-5-desktop.svg">Open desktop at full size</a> · <a id="mobile-link" href="best-products-wireframe-5-mobile.svg">Open mobile at full size</a></header><main><figure class="desktop"><figcaption>DESKTOP · 1440 PX</figcaption><img src="best-products-wireframe-5-desktop.svg"></figure><figure class="mobile"><figcaption>MOBILE · 390 PX</figcaption><img src="best-products-wireframe-5-mobile.svg"></figure></main><script>document.getElementById('button-count').addEventListener('change',function(){const suffix=this.value==='3'?'':'-'+this.value+'-buttons';for(const mode of ['desktop','mobile']){const path='best-products-wireframe-5-'+mode+suffix+'.svg';document.querySelector('.'+mode+' img').src=path;document.getElementById(mode+'-link').href=path;}});</script>''' ,encoding='utf-8')
print(json.dumps(stats))

