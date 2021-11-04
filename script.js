let cards0 = ["mem0.jpg","mem4.jpg","mem5.jpg","mem0.jpg","mem9.jpg",
				"mem7.jpg","mem2.jpg","mem3.jpg","mem1.jpg","mem6.jpg",
				"mem7.jpg","mem9.jpg","mem4.jpg","mem8.jpg","mem2.jpg",
				"mem5.jpg","mem1.jpg","mem6.jpg","mem3.jpg","mem8.jpg"];
let cards = new Array(cards0.length);
let picNr;
let picQ = 20;
for(let i=0; i<20; i++)
{
	picNr = Math.floor(Math.random()*picQ);
	cards[i] = cards0[picNr];
	cards0.splice(picNr,1);
	picQ--;
}
for(let i=0; i<20; i++)
{
 document.getElementById('card'+i).addEventListener("click", function () {revealCard(i);});
}
let cardShown = false;
let counter = 0;
let nr1;
let flag = false;
let hiddenPairs = 10;
const right = new Audio("right.wav");
const wrong = new Audio("wrong.wav");
function revealCard(nr)
{
	let opacity = $('#card'+nr).css('opacity');
	if (opacity != 0 && flag == false)
	{
		flag = true;
		let image = "url(img/"+cards[nr]+")";
		$('#card'+nr).css('background-image',image);
		if(cardShown && nr != nr1)//second card
		{
			if(cards[nr]==cards[nr1])
			{
				setTimeout("hideImage("+nr+","+nr1+")",750);
			}
			else
			{
				setTimeout("changeImage("+nr+","+nr1+")",750);
			}
			counter++;
			$('.score').html('Turn counter: '+counter);
			cardShown = false;
		}
		else//first card
		{		
			cardShown = true;
			nr1=nr;
			flag = false;
		}
	}	
}
function changeImage(nb1,nb2)
{
	$('#card'+nb1).css('background-image', "url('img/empty.jpg')");
	$('#card'+nb2).css('background-image', "url('img/empty.jpg')");
	flag = false;
	wrong.play();
}
function hideImage(n1,n2)
{
	$('#card'+n1).css('opacity', 0);
	$('#card'+n2).css('opacity', 0);
	$('#card'+n1).css('cursor', 'default');
	$('#card'+n2).css('cursor', 'default');
	flag = false;
	hiddenPairs--;
	right.play();
	if (hiddenPairs == 0) 
	{
		$('.board').html("You won in "+counter+" turns");
		$('.board').addClass("won");
		$('.score').html("Play again");
		const finish = document.querySelector('.score');
		finish.addEventListener("click", function () {location.reload()});
		$('.score').addClass("finish");
	}
}