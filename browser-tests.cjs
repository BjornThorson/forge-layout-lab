const {chromium}=require('/tmp/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chromium',args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const results=[];async function test(name,fn){try{await fn();results.push({name,pass:true})}catch(e){results.push({name,pass:false,error:e.message.slice(0,200)})}}
 await page.goto('file:///vercel/foe-layout/index.html');
 await test('initial 56x56 grid',async()=>assert.equal(await page.locator('#board .cell').count(),3136));
 await test('starting expansion 16x16',async()=>assert.match(await page.locator('#stats').innerText(),/256 available tiles/));
 await test('zoom buttons',async()=>{await page.locator('#zoom-in').click();await page.locator('#zoom-out').click();await page.locator('#zoom-reset').click();assert.equal(await page.locator('#board .cell').count(),3136)});
 await test('expansion toggling',async()=>{await page.locator('#board .cell').nth(912).click();assert.match(await page.locator('#stats').innerText(),/272 available tiles/);await page.locator('#board .cell').nth(912).click();assert.match(await page.locator('#stats').innerText(),/256 available tiles/)});
 await test('expansion lock',async()=>{await page.locator('#expansion-lock').click();await page.locator('#board .cell').nth(912).click();assert.match(await page.locator('#stats').innerText(),/256 available tiles/);await page.locator('#expansion-lock').click()});
 await test('Town Hall coordinate editing',async()=>{await page.locator('#thx').fill('2');await page.locator('#thx').dispatchEvent('change');assert.equal(await page.locator('#thx').inputValue(),'2');await page.locator('#thx').fill('0');await page.locator('#thx').dispatchEvent('change')});
 await test('add building and generate',async()=>{await page.locator('#name').fill('Browser Test Workshop');await page.locator('#bw').fill('3');await page.locator('#bh').fill('3');await page.locator('#qty').fill('1');await page.locator('#add').click();await page.locator('#generate').click();assert.equal(await page.locator('#board .cell').count(),3136);assert.match(await page.locator('#status').innerText(),/road access|Could not fit/i)});
 await test('real pointer map drag',async()=>{const target=page.locator('#board .cell').nth(1200);const r=await target.boundingBox();const before=await page.locator('#diamond-stage').getAttribute('style');await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width/2-65,r.y+r.height/2-40,{steps:6});await page.mouse.up();const after=await page.locator('#diamond-stage').getAttribute('style');assert.notEqual(before,after)});
 await test('mouse wheel zoom',async()=>{const before=await page.locator('#diamond-stage').getAttribute('style');await page.locator('#board .cell').nth(1200).hover();await page.mouse.wheel(0,-300);await page.waitForTimeout(80);const after=await page.locator('#diamond-stage').getAttribute('style');assert.notEqual(before,after)});
 await test('no uncaught browser errors',async()=>assert.deepEqual(errors,[]));
 console.log(JSON.stringify({results,errors},null,2));await browser.close();if(results.some(r=>!r.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
