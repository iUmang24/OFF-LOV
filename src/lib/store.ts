import street from '@/assets/jaipur-street.jpg';
import detail from '@/assets/jaipur-detail.jpg';
import editorialOne from '@/assets/editorial-one.jpg';
import editorialTwo from '@/assets/editorial-two.jpg';
export const imagery = { street, detail, editorialOne, editorialTwo };
export type Product = { id: string; name: string; category: string; price: number; image: string; drop: string; description: string; care: string };
export const products: Product[] = [
  {id:'boxy-oversized-tee',name:'BOXY OVERSIZED TEE',category:'BOXY FITS',price:1299,image:editorialOne,drop:'OFF THE GRID',description:'No rules. No narrow fits. The everyday uniform for moving differently.',care:'240 GSM COTTON · MACHINE WASH COLD'},
  {id:'waffle-knit-half-sleeve',name:'WAFFLE KNIT HALF-SLEEVE',category:'WAFFLES',price:1599,image:detail,drop:'OFF THE GRID',description:'Texture you can feel. Cut loose for the days that run into nights.',care:'TEXTURED COTTON · WASH INSIDE OUT'},
  {id:'varsity-jersey',name:'VARSITY JERSEY',category:'JERSEYS',price:2199,image:editorialTwo,drop:'CONCRETE JUNGLE',description:'Sport references, street intention. Built for a different kind of team.',care:'BREATHABLE MESH · MACHINE WASH COLD'},
  {id:'relaxed-fit-denim',name:'RELAXED FIT DENIM',category:'JEANS',price:2799,image:editorialOne,drop:'CONCRETE JUNGLE',description:'The fit is relaxed. The attitude isn’t. A worn-in essential for every route.',care:'100% DENIM · WASH SPARINGLY'},
  {id:'afterhours-graphic-tee',name:'AFTERHOURS GRAPHIC TEE',category:'TEES',price:1399,image:street,drop:'OFF THE GRID',description:'For all the hours that matter after everything closes.',care:'HEAVYWEIGHT COTTON · MACHINE WASH COLD'},
  {id:'concrete-boxy-shirt',name:'CONCRETE BOXY SHIRT',category:'BOXY FITS',price:1899,image:editorialTwo,drop:'CONCRETE JUNGLE',description:'Unfinished edges and a silhouette that holds its ground.',care:'COTTON TWILL · WASH INSIDE OUT'},
  {id:'mono-waffle-layer',name:'MONO WAFFLE LAYER',category:'WAFFLES',price:1799,image:detail,drop:'MONOCHROME ONLY',description:'A textured layer with nothing unnecessary left behind.',care:'WAFFLE COTTON · MACHINE WASH COLD'},
  {id:'streetline-jersey',name:'STREETLINE JERSEY',category:'JERSEYS',price:2299,image:editorialTwo,drop:'MONOCHROME ONLY',description:'An off-court uniform for everywhere else.',care:'POLY MESH · MACHINE WASH COLD'},
  {id:'washed-wide-leg',name:'WASHED WIDE LEG',category:'JEANS',price:2999,image:editorialOne,drop:'CONCRETE JUNGLE',description:'Room to move. Made to take the long way home.',care:'WASHED DENIM · WASH SPARINGLY'},
  {id:'off-grid-cap',name:'OFF GRID CAP',category:'ACCESSORIES',price:899,image:street,drop:'OFF THE GRID',description:'Low profile. High rotation. An everyday finishing touch.',care:'COTTON CANVAS · SPOT CLEAN'},
  {id:'utility-crossbody',name:'UTILITY CROSSBODY',category:'ACCESSORIES',price:1499,image:detail,drop:'MONOCHROME ONLY',description:'Carry less. Go further.',care:'TECHNICAL CANVAS · SPOT CLEAN'},
];
export const drops = [
  {id:'OFF THE GRID', number:'01', title:'OFF THE GRID', copy:'Oversized silhouettes built for the street, not the runway. A new uniform for taking your own route.', image:street},
  {id:'CONCRETE JUNGLE', number:'02', title:'CONCRETE JUNGLE', copy:'Jaipur-rooted streetwear with a raw, unfinished edge. Made for the city that made us.', image:editorialTwo},
  {id:'MONOCHROME ONLY', number:'03', title:'MONOCHROME ONLY', copy:'Black and white pieces stripped of everything unnecessary. Nothing to hide behind.', image:detail},
];
export const articles = [
  {id:'jaipur-streetwear',date:'AUG 2026',title:"HOW JAIPUR’S STREETWEAR SCENE IS TAKING SHAPE",read:'4 MIN READ',image:street,body:['Jaipur has always known how to make an impression. But beyond the postcards and the pink walls, a new language is taking shape on its streets. It’s loose, layered, and entirely its own.','For the people making it, streetwear is less about following a global blueprint and more about finding room to move within their own city. The silhouettes borrow from everywhere. The energy belongs right here.','OFF CULTURE started with that idea: make pieces you actually want to live in. Wear them outside, wear them late, wear them wherever the day ends up.']},
  {id:'boxy-fit',date:'JUL 2026',title:'THE BOXY FIT: WHY OVERSIZED WON',read:'5 MIN READ',image:editorialOne,body:['A good fit gives you space. The boxy silhouette changed the way we think about proportions, turning a simple tee into the foundation of a whole outfit.','Dropped shoulders, structured fabric and a little extra room make it feel deliberate rather than oversized by accident. The point is comfort without compromise.','It is not a trend we’re waiting to outgrow. It is a different way to wear what feels like you.']},
  {id:'first-drop',date:'JUN 2026',title:"OFF CULTURE’S FIRST DROP, ONE YEAR LATER",read:'3 MIN READ',image:editorialTwo,body:['A year ago we put the first pieces out into the world. No big speech. Just a few silhouettes and a conviction that Jaipur had another story to tell.','Since then, every drop has taught us something about fabric, form and the people who wear it. What has not changed is the feeling that started it all.','This is still about making room for the ones who never fit the mold.']},
  {id:'after-dark',date:'MAY 2026',title:'AFTER DARK IN THE PINK CITY',read:'4 MIN READ',image:detail,body:['The city changes character after the crowds go home. The streets get quieter, the light gets sharper, and familiar corners start feeling brand new.','That contrast lives in our clothes: everyday pieces with just enough edge to take on a second life after sunset.','For us, the best ideas rarely happen on schedule.']},
  {id:'less-but-better',date:'APR 2026',title:'LESS, BUT BETTER: THE CASE FOR KEEPING IT SIMPLE',read:'6 MIN READ',image:editorialOne,body:['There is power in removing what does not belong. A cleaner palette lets cut, texture and movement do the talking.','Choosing pieces you’ll keep wearing is a more considered way forward. Better fabric, stronger shapes, less noise.','It is not about doing less for its own sake. It is about making everything count.']},
];
export const rupees = (price:number) => `₹${price.toLocaleString('en-IN')}`;
export const meta = (title:string,description:string) => ({ meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] });
