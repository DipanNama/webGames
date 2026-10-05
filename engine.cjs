(function(root){
 const SIZE=20;
 function foodFor(snake,random=Math.random){const free=[];for(let y=1;y<=SIZE;y++)for(let x=1;x<=SIZE;x++)if(!snake.some(s=>s.x===x&&s.y===y))free.push({x,y});return free[Math.min(free.length-1,Math.floor(random()*free.length))]||null;}
 function create(random=Math.random){const snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];return {snake,food:foodFor(snake,random),direction:{x:1,y:0},score:0,over:false};}
 function step(state,direction=state.direction,random=Math.random){if(state.over)return state;const opposite=direction.x===-state.direction.x&&direction.y===-state.direction.y;const d=opposite?state.direction:direction;const head={x:state.snake[0].x+d.x,y:state.snake[0].y+d.y};const eats=head.x===state.food?.x&&head.y===state.food?.y;const body=eats?state.snake:state.snake.slice(0,-1);if(head.x<1||head.x>SIZE||head.y<1||head.y>SIZE||body.some(s=>s.x===head.x&&s.y===head.y))return {...state,over:true,direction:d};const snake=[head,...state.snake];if(!eats)snake.pop();const food=eats?foodFor(snake,random):state.food;return {snake,food,direction:d,score:state.score+(eats?1:0),over:!food};}
 const api={SIZE,foodFor,create,step};if(typeof module!=='undefined')module.exports=api;else root.SnakeEngine=api;
})(globalThis);
