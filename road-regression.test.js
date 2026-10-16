const fs=require('fs'),s=fs.readFileSync('/vercel/foe-layout/index.html','utf8'),start=s.indexOf('function optimize('),end=s.indexOf('$("add").onclick',start),optimize=Function(s.slice(start,end)+';return optimize')();
const scenarios=[
['hall centre',28,28,[],{x:11,y:11,w:7,h:6},[{id:1,w:4,h:4,roadSize:2},{id:2,w:3,h:3,roadSize:1}]],
['hall edge',28,28,[],{x:0,y:0,w:7,h:6},[{id:1,w:4,h:4,roadSize:2},{id:2,w:5,h:3,roadSize:2}]],
['obstacle wall',28,28,Array.from({length:20},(_,i)=>14*28+i+4),{x:0,y:0,w:7,h:6},[{id:1,w:4,h:4,roadSize:2},{id:2,w:4,h:4,roadSize:2}]],
['tight map',12,12,[],{x:0,y:0,w:7,h:6},[{id:1,w:3,h:3,roadSize:2},{id:2,w:2,h:2,roadSize:1}]],
['blocked surrounding hall',16,16,Array.from({length:16*16},(_,i)=>i).filter(i=>!(i%16<9&&Math.floor(i/16)<8)),{x:0,y:0,w:7,h:6},[{id:1,w:2,h:2,roadSize:2}]],
['zero road',20,20,[],{x:0,y:0,w:7,h:6},[{id:1,w:2,h:2,roadSize:0}]],
];
let failures=0;for(const [name,W,H,blocked,hall,items] of scenarios){const result=optimize(W,H,items.map(x=>({...x,name:'Building'})),new Set(blocked),hall);const bad=[...result.road].filter(i=>result.grid[i]!==0);const wideBad=[...result.wide].filter(i=>!result.road.has(i));const missing=result.connected.filter(b=>b.roadSize===2&&!(()=>{for(let y=b.y-1;y<=b.y+b.h;y++)for(let x=b.x-1;x<=b.x+b.w;x++)if(x>=0&&y>=0&&x<W&&y<H&&(x===b.x-1||x===b.x+b.w||y===b.y-1||y===b.y+b.h)&&result.wide.has(y*W+x))return true;return false})());let pass=!bad.length&&!wideBad.length&&!missing.length;console.log(JSON.stringify({scenario:name,pass,placed:result.placed.length,connected:result.connected.length,wideTiles:result.wide.size,invalidRoadTiles:bad.length,missingWideAdjacency:missing.length}));if(!pass)failures++}process.exitCode=failures?1:0;
