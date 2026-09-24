from pathlib import Path
import base64, html, textwrap
OUT=Path('outputs'); OUT.mkdir(exist_ok=True)
BG='#FAF8F3'; INK='#292B25'; MUTED='#65685D'; OLIVE='#46513E'; SAND='#EEEADF'
imgs={p.stem:'data:image/jpeg;base64,'+base64.b64encode(p.read_bytes()).decode() for p in Path('work').glob('*.jpg')}
class Design:
 def __init__(self,w): self.w=w; self.a=[]; self.y=0; self.sections=[]
 def rect(self,x,y,w,h,c):self.a.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"/>')
 def text(self,s,x,y,size=16,width=None,serif=False,color=INK):
  lines=textwrap.wrap(s,width=max(8,int(width/(size*(.50 if serif else .55))))) if width else [s]
  for i,line in enumerate(lines):self.a.append(f'<text x="{x}" y="{y+i*size*1.28}" font-family="{ "Georgia" if serif else "Arial"}" font-size="{size}" fill="{color}">{html.escape(line)}</text>')
  return len(lines)*size*1.28
 def photo(self,key,x,y,w,h):self.a.append(f'<image x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice" href="{imgs[key]}"/>')
 def heading(self,name,title,y):
  self.sections.append(name);self.a.append(f'<g id="{name}"><title>{html.escape(name)}</title></g>');self.text(title,80 if self.w>500 else 24,y,36 if self.w>500 else 28, self.w-48,True)
 def card(self,key,tag,title,x,y,w,h=240):
  self.photo(key,x,y,w,h);self.text(tag.upper(),x,y+h+25,11,w,color=OLIVE);ht=self.text(title,x,y+h+57,27 if w>300 else 22,w,True);return h+65+ht
 def save(self,name):
  self.a.insert(0,f'<rect width="{self.w}" height="{self.y}" fill="{BG}"/>')
  s=f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.y}" viewBox="0 0 {self.w} {self.y}"><title>Wireframe 1 — Homepage ({name})</title>'+''.join(self.a)+'</svg>'
  (OUT/f'homepage-wireframe-1-{name}.svg').write_text(s,encoding='utf-8')
latest=[('bedroom-soft','Bedroom','15 Small Bedroom Ideas That Maximize Space'),('bathroom','Bathroom','A Calmer Bathroom Starts with Simple Details'),('kitchen','Organization','Small-Space Storage Ideas That Work'),('living','Living Room','Bring Warmth to Your Living Room'),('bedroom-modern','Shopping Finds','15 Amazon Bedroom Finds Worth Discovering'),('lamp','Buying Guide','How to Choose Bedroom Lighting')]
rooms=[('bedroom-modern','Bedroom'),('living','Living Room'),('kitchen','Kitchen'),('bathroom','Bathroom')]
finds=[('neutral','Amazon Home Finds'),('kitchen','Kitchen Finds'),('bedroom-soft','Bedroom Finds'),('bathroom','Organization Finds')]
picks=[('lamp','7 Best Bedside Lamps'),('bathroom','Best Bathroom Organizers'),('kitchen','Best Kitchen Storage Products')]
guides=['How to Choose an Area Rug','How to Choose Bedroom Lighting','How to Choose Storage Containers']
d=Design(1440);d.sections.append('01 Header');d.text('IDEAS FOR A HOME',80,69,10);d.text('THAT FEELS LIKE YOU',80,84,10);d.text('home & living',574,91,50,serif=True);d.text('THE WEEKLY EDIT   ↗',1080,78,10)
d.text('INTERIOR DESIGN',465,158,10);d.text('ROOMS',585,158,10);d.text('HOME ORGANIZATION',655,158,10);d.text('SHOPPING',805,158,10);d.text('SEARCH',1150,158,10)
d.a.append('<g transform="translate(0 64)">');d.sections.append('02 Featured story');d.photo('bedroom-modern',80,144,800,550);d.rect(880,144,480,550,SAND)
d.text('INTERIOR DESIGN',920,218,12,color=OLIVE);d.text('15 Modern Luxury Bedroom Ideas',920,285,52,390,True);d.text('Beautiful materials, layered lighting, and thoughtful details for an elegant home.',920,475,17,370);d.text('READ STORY  →',920,608,13)
y=780;d.heading('03 Latest Ideas','Latest Ideas',y)
for i,(im,tag,title) in enumerate(latest):d.card(im,tag,title,80+(i%3)*438,y+35+(i//3)*410,404,260)
y+=910;d.heading('04 Rooms','Find Ideas for Your Room',y)
for i,(im,title) in enumerate(rooms):
 x=80+(i%2)*652; yy=y+40+(i//2)*410;d.photo(im,x,yy,628,320);d.text(title,x,yy+360,30,serif=True);d.text('EXPLORE ROOM  →',x+435,yy+358,12)
y+=905;d.heading('05 Interior Design','Interior Design Inspiration',y);d.photo('living',80,y+40,820,450);d.text('17 Beautiful Organic Modern Interiors',80,y+532,35,800,True);d.text('Natural textures and thoughtful details for a warm, welcoming home.',80,y+572,16);d.text('EXPLORE INTERIOR DESIGN  →',80,y+620,12)
d.card('neutral','Color & Style','Warm Neutrals, Beautifully Layered',932,y+40,428,170);d.card('bedroom-soft','Bedroom Ideas','Small Changes, Softer Spaces',932,y+344,428,170)
y+=725;d.rect(0,y-40,1440,545,SAND);d.heading('06 Organization','Make Your Home Work Better',y);d.text('HOME ORGANIZATION',80,y+35,12,color=OLIVE)
for i,(im,title) in enumerate([('kitchen','Kitchen Organization'),('bathroom','Bathroom Organization'),('neutral','Closet Organization')]):d.card(im,'Practical Ideas',title,80+i*438,y+65,404,250)
d.text('EXPLORE ORGANIZATION  →',80,y+465,12);y+=605;d.heading('07 Shopping Finds','Home Finds Worth Discovering',y)
for i,(im,title) in enumerate(finds):d.card(im,'Shopping Finds',title,80+i*326,y+40,302,250)
d.text('EXPLORE SHOPPING FINDS  →',80,y+443,12);y+=540;d.heading('08 Shop the Look','Shop the Look',y);d.photo('bedroom-modern',80,y+40,1280,620);d.text('SHOP THE LOOK',80,y+700,12,color=OLIVE);d.text('Warm Modern Bedroom',80,y+756,48,serif=True);d.text('Bed  •  Lamp  •  Rug  •  Nightstand  •  Bedding',80,y+799,17);d.rect(1080,y+717,280,56,OLIVE);d.text('SHOP THIS LOOK  →',1120,y+752,14,color='#FFFFFF')
y+=910;d.heading('09 Product Picks','Our Product Picks',y)
for i,(im,title) in enumerate(picks):d.card(im,'Best Products',title,80+i*438,y+40,404,280)
y+=495;d.heading('10 Buying Guides','Before You Buy',y)
for i,title in enumerate(guides):d.rect(80,y+34+i*66,1280,1,'#D6D1C5');d.text(title,80,y+76+i*66,24,serif=True);d.text('→',1320,y+76+i*66,24)
y+=320;d.heading('11 Popular','Popular Right Now',y)
for i,(im,tag,title) in enumerate(latest[:4]):d.card(im,tag,title,80+i*326,y+40,302,180)
y+=420;d.sections.append('12 Newsletter');d.rect(0,y,1440,300,OLIVE);d.text('Make Your Home Better',80,y+84,48,serif=True,color='#FFFFFF');d.text('Beautiful interiors, organization ideas, and curated finds.',80,y+130,17,color='#FFFFFF');d.rect(80,y+174,620,56,BG);d.text('Email address',100,y+208,16);d.rect(716,y+174,180,56,'#DED5C4');d.text('SIGN UP  →',754,y+208,14)
y+=300;d.sections.append('13 Footer');d.rect(0,y,1440,455,SAND);d.text('home & living',80,y+95,43,serif=True);d.text('Ideas for a home that feels like you.',80,y+140,16);d.text('PINTEREST  ↗     INSTAGRAM  ↗',80,y+192,12)
for x,title,links in [(600,'EXPLORE',['Interior Design','Rooms','Home Organization','Shopping']),(855,'ROOMS',['Bedroom','Living Room','Kitchen','Bathroom']),(1110,'SHOPPING',['Best Products','Buying Guides','Shopping Finds','Shop the Look'])]:
 d.text(title,x,y+76,12,color=OLIVE)
 for i,link in enumerate(links):d.text(link,x,y+116+i*35,15)
d.rect(80,y+286,1280,1,'#D6D1C5');d.text('About     Contact     Editorial Policy     Affiliate Disclosure     Privacy     Terms',80,y+327,14);d.text('Some shopping links may earn us a commission. Read our affiliate disclosure.',80,y+370,13,color=MUTED);d.text('© 2026 Home & Living. All rights reserved.',80,y+411,12,color=MUTED);d.a.append('</g>');d.y=y+519;d.save('desktop')
m=Design(390);m.sections.append('01 Header');m.text('☰',24,43,22);m.text('home & living',85,44,29,serif=True);m.text('SEARCH',324,41,10)
m.sections.append('02 Featured story');m.photo('bedroom-modern',0,72,390,365);m.text('INTERIOR DESIGN',24,469,11,color=OLIVE);m.text('15 Modern Luxury Bedroom Ideas',24,512,37,342,True);m.text('Beautiful materials, layered lighting, and thoughtful details for an elegant home.',24,650,15,342);m.text('READ STORY →',24,739,12)
y=815;m.heading('03 Latest Ideas','Latest Ideas',y)
for im,tag,title in latest[:2]:y+=36;y+=m.card(im,tag,title,24,y,342,225)+24
m.text('SEE MORE →',24,y+20,12);y+=100;m.heading('04 Rooms','Browse by Room',y)
for i,(im,title) in enumerate(rooms):x=24+(i%2)*179;yy=y+35+(i//2)*212;m.photo(im,x,yy,163,156);m.text(title,x,yy+185,21,serif=True)
y+=490;m.heading('05 Interior Design','Interior Design',y);y+=35;y+=m.card('living','Inspiration','17 Beautiful Organic Modern Interiors',24,y,342,250);m.text('EXPLORE INTERIOR DESIGN →',24,y+30,12);y+=115;m.heading('06 Organization','Home Organization',y);y+=35;y+=m.card('kitchen','Practical Ideas','Small-Space Storage Ideas',24,y,342,230)
for im,title in [('bathroom','Bathroom Organization'),('neutral','Closet Organization')]:m.photo(im,24,y+24,100,82);m.text(title,141,y+50,21,220,True);y+=113
m.text('EXPLORE ORGANIZATION →',24,y+25,12);y+=105;m.heading('07 Shopping Finds','Shopping Finds',y)
for im,title in [('bedroom-soft','Amazon Bedroom Finds'),('kitchen','Kitchen Finds')]:y+=35;y+=m.card(im,'Shopping Finds',title,24,y,342,230)+15
m.text('EXPLORE SHOPPING →',24,y+24,12);y+=105;m.heading('08 Shop the Look','Shop the Look',y);m.photo('bedroom-modern',24,y+35,342,365);m.text('Warm Modern Bedroom',24,y+444,32,342,True);m.text('Bed • Lamp • Rug • Bedding',24,y+526,14);m.rect(24,y+557,342,52,OLIVE);m.text('SHOP THIS LOOK →',110,y+589,13,color='#FFFFFF');y+=690;m.heading('09 Product Picks','Our Product Picks',y)
for im,title in picks[:2]:y+=35;y+=m.card(im,'Best Products',title,24,y,342,235)+15
y+=60;m.heading('10 Buying Guides','Before You Buy',y)
for title in guides:m.rect(24,y+32,342,1,'#D6D1C5');m.text(title+' →',24,y+69,23,342,True);y+=105
y+=70;m.heading('11 Popular','Popular Right Now',y)
for im,tag,title in latest[:4]:m.photo(im,24,y+30,96,83);m.text(title,138,y+50,20,222,True);y+=126
y+=60;m.sections.append('12 Newsletter');m.rect(0,y,390,345,OLIVE);m.text('Make Your Home Better',24,y+60,33,342,True,'#FFFFFF');m.text('Beautiful interiors, organization ideas and curated finds.',24,y+145,15,342,color='#FFFFFF');m.rect(24,y+203,342,48,BG);m.text('Email address',40,y+233,15);m.rect(24,y+265,342,48,'#DED5C4');m.text('SIGN UP →',150,y+296,13)
y+=345;m.sections.append('13 Footer');m.rect(0,y,390,850,SAND);m.text('home & living',24,y+67,36,serif=True);m.text('Ideas for a home that feels like you.',24,y+105,14)
for x,title,links in [(24,'EXPLORE',['Interior Design','Rooms','Home Organization','Shopping']),(215,'ROOMS',['Bedroom','Living Room','Kitchen','Bathroom'])]:
 m.text(title,x,y+162,11,color=OLIVE)
 for i,link in enumerate(links):m.text(link,x,y+200+i*34,14)
m.text('SHOPPING',24,y+367,11,color=OLIVE)
for i,link in enumerate(['Best Products','Buying Guides','Shopping Finds','Shop the Look']):m.text(link,24,y+404+i*34,14)
m.text('PINTEREST ↗     INSTAGRAM ↗',24,y+558,12);m.rect(24,y+590,342,1,'#D6D1C5');m.text('About · Contact · Editorial Policy',24,y+625,13);m.text('Affiliate Disclosure · Privacy · Terms',24,y+660,13);m.text('Some shopping links may earn us a commission. Read our affiliate disclosure.',24,y+708,13,342,color=MUTED);m.text('© 2026 Home & Living.',24,y+787,12,color=MUTED);m.y=y+850;m.save('mobile')
assert len(d.sections)==len(m.sections)==13
(OUT/'homepage-wireframe-1-preview.html').write_text('''<!doctype html><meta charset="utf-8"><title>Homepage Wireframe 1 — corrected</title><style>body{margin:0;background:#dedbd3;font:15px Arial;color:#292b25}header{padding:24px 4%;background:#fff}main{display:flex;align-items:flex-start;gap:30px;padding:30px}figure{margin:0}img{display:block;width:100%;box-shadow:0 2px 16px #0002}figcaption{padding:15px 0} .desktop{width:75%}.mobile{width:22%}</style><header><b>Wireframe 1 — Homepage</b><p>Corrected desktop + mobile · all 13 sections · temporary brand name · illustrative photography. Popular Right Now is included to match the full wireframe; it may be deferred for launch.</p></header><main><figure class="desktop"><figcaption>DESKTOP · 1440 PX</figcaption><img src="homepage-wireframe-1-desktop.svg"></figure><figure class="mobile"><figcaption>MOBILE · 390 PX</figcaption><img src="homepage-wireframe-1-mobile.svg"></figure></main>''',encoding='utf-8')
print({'desktop_height':d.y,'mobile_height':m.y,'desktop_sections':d.sections,'mobile_sections':m.sections})
