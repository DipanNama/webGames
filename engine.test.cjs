const {test}=require('node:test'),assert=require('node:assert/strict'),E=require('./engine.cjs');
test('starts in bounds with food off the snake',()=>{const s=E.create(()=>0);assert.equal(s.snake.length,3);assert(!s.snake.some(p=>p.x===s.food.x&&p.y===s.food.y));});
test('advances without mutating old state',()=>{const s=E.create();const n=E.step(s);assert.equal(n.snake[0].x,11);assert.equal(s.snake[0].x,10);assert.equal(n.snake.length,3);});
test('ignores reverse direction',()=>assert.equal(E.step(E.create(),{x:-1,y:0}).snake[0].x,11));
test('eating grows snake and increases score',()=>{const s=E.create();s.food={x:11,y:10};const n=E.step(s);assert.equal(n.score,1);assert.equal(n.snake.length,4);assert(!n.snake.some(p=>p.x===n.food.x&&p.y===n.food.y));});
test('wall collision ends the game',()=>{const s=E.create();s.snake=[{x:20,y:10}];assert(E.step(s).over);});
test('self collision ends the game',()=>{const s=E.create();s.snake=[{x:10,y:10},{x:11,y:10},{x:11,y:11},{x:10,y:11}];assert(E.step(s).over);});
test('can move into vacated tail cell',()=>{const s=E.create();s.snake=[{x:10,y:10},{x:10,y:11},{x:11,y:11},{x:11,y:10}];assert(!E.step(s).over);});
test('full board has no food',()=>{const a=[];for(let y=1;y<=20;y++)for(let x=1;x<=20;x++)a.push({x,y});assert.equal(E.foodFor(a),null);});
