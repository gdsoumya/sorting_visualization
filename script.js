let bars=[]; //array of elements/bars
const def="#fd0081",chng="#431f91", finished="#8ef511", selected="yellow"; // color specifications

window.onload = setup(); //setup bars and data on page load

/* setup(): initializes the bars and default input values */
async function setup(){
	let b=document.getElementById("bars");
	let d=document.getElementById("delay");
	document.getElementById("b").innerText=b.value;
	document.getElementById("d").innerText=d.value+"ms";
	if(bars.length!=parseInt(b.value)){
		generateBars(parseInt(b.value));
	}
}

/* reset() : reloads the page and resets all running algorithms */
function reset(){
	location.reload();
}

/* start() : fetches delay and disables all inputs before the sorting algorithm is executed */
function start(){
		let x=document.getElementsByTagName("input");
		for(let i=0;i<x.length;i++)
			x[i].disabled=true;
		return parseInt(document.getElementById("delay").value);
}

/* fin() : once the sorting algorithm completes, fin() enables the inputs and changes the bar color to indicate completion */
function fin(){
	let x=document.getElementsByClassName("bar");
	for(let i=0;i<x.length;i++)
		x[i].style.backgroundColor=finished;
	x=document.getElementsByTagName("input");
	for(let i=0;i<x.length;i++)
		x[i].disabled=false;
	
}

/* generateBars() : generates a n no. of bars with random height for sorting */
function generateBars(n=-1){
	bars=[];
	let container=document.getElementById("container");
	n=n<0?Math.random()*20:n;
	for(let i=0;i<n;i++)
		bars.push('<div class="bar" id="'+i+'" style="height:'+Math.floor(2+Math.random()*98)+'%"></div>');
	container.innerHTML=bars.join('');
}
	
/* sleep() : custom sleep function to add ddelay to algorithms for proper visualization */
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}



// SELECTION SORT

/* SelectionSort() : Implementation of selection sort algorithm. --> O(n^2) */
async function SelectionSort(){
	let delay=start();
	let container=document.getElementById("container");
	for(let i=0;i<bars.length;i++){
		let temp=i;
		let id1=bars[i].split('id="')[1].split('"')[0];
		document.getElementById(id1).style.backgroundColor=selected;
		for(let j=i+1;j<bars.length;j++){
			let id2=bars[j].split('id="')[1].split('"')[0];
			document.getElementById(id2).style.backgroundColor=chng;
			if(parseInt(bars[temp].split(/[:%]/)[1])>parseInt(bars[j].split(/[:%]/)[1]))
				temp=j;
			await sleep(delay/5.0);
			document.getElementById(id2).style.backgroundColor=def;
		}
		let id2=bars[temp].split('id="')[1].split('"')[0];
		document.getElementById(id2).style.backgroundColor=selected;
		await sleep(2*delay/5.0);
		let t=bars[temp];bars[temp]=bars[i];bars[i]=t;
		container.innerHTML=bars.join('');
		await sleep(2*delay/5.0);
		document.getElementById(id1).style.backgroundColor=def;
		document.getElementById(id2).style.backgroundColor=def;
	}
	fin();
}


// BUBBLE SORT

/* BubbleSort() : Implementation of bubble sort algorithm. --> O(n^2) */
async function BubbleSort(){
	let delay=start();
	let container=document.getElementById("container");
	for(let i=0;i<bars.length-1;i++){
		let f=0;
		for(let j=0;j<bars.length-i-1;j++){
			let id1=bars[j].split('id="')[1].split('"')[0],id2=bars[j+1].split('id="')[1].split('"')[0];
			document.getElementById(id1).style.backgroundColor=selected;
			document.getElementById(id2).style.backgroundColor=chng;
			await sleep(delay/2);
			if(parseInt(bars[j].split(/[:%]/)[1])>parseInt(bars[j+1].split(/[:%]/)[1])){
				f=1;
				let t=bars[j];bars[j]=bars[j+1];bars[j+1]=t;
				container.innerHTML=bars.join('');
			}
			document.getElementById(id1).style.backgroundColor=selected;
			document.getElementById(id2).style.backgroundColor=chng;
			await sleep(delay/2.0);
			document.getElementById(id1).style.backgroundColor=def;
			document.getElementById(id2).style.backgroundColor=def;
		}
		if(f==0)
			break;
	}
	fin();
}


// INSERTION SORT

/* InsertionSort() : Implementation of inserion sort algorithm. --> O(n^2) */
async function InsertionSort(){
	let delay=start();
	let container=document.getElementById("container");
	for(let i=1;i<bars.length;i++){
		let j=i-1, key=bars[i], id1=key.split('id="')[1].split('"')[0], id2=bars[j].split('id="')[1].split('"')[0];
		console.log(id1);
		document.getElementById(id1).style.backgroundColor=selected;
		while(j>=0 && parseInt(bars[j].split(/[:%]/)[1])>parseInt(key.split(/[:%]/)[1])){
			document.getElementById(id2).style.backgroundColor=def;
			id2=bars[j].split('id="')[1].split('"')[0];
			document.getElementById(id2).style.backgroundColor=chng;
			await sleep(delay);
			bars[j+1]=bars[j];
			j--;
		}
		bars[j+1]=key;
		container.innerHTML=bars.join('');
		document.getElementById(id1).style.backgroundColor=selected;
		document.getElementById(id2).style.backgroundColor=chng;
		await sleep(delay*3.0/5);
		document.getElementById(id1).style.backgroundColor=def;
		document.getElementById(id2).style.backgroundColor=def;
	}
	fin();
}


// MERGE SORT

/* slide() : places bars[r] at lth position by sliding other bars to the right */ 
function slide(l,r){
	let temp=bars[r];
	for(let i=r-1;i>=l;i--){
		bars[i+1]=bars[i];
	}
	bars[l]=temp;
	}

/* merge() : part of merge sort algorithm, merges the bars in sorted order, 
   not implemented in O(n^2) instead of O(n) for visualization purpose 
*/
async function merge(l,m,r,d){
	let y=l;
	let i=l,j=m+1;
	while(i<j && j<=r){
		let id1=bars[j].split('id="')[1].split('"')[0],id2=bars[i].split('id="')[1].split('"')[0];
		document.getElementById(id1).style.backgroundColor=selected;
		document.getElementById(id2).style.backgroundColor=chng;
		if(parseInt(bars[j].split(/[:%]/)[1])>parseInt(bars[i].split(/[:%]/)[1]))
			i++;
		else{
			slide(i,j);
			i++;j++;
		}
		await sleep(d/2.0);
		container.innerHTML=bars.join('');
		document.getElementById(id1).style.backgroundColor=selected;
		document.getElementById(id2).style.backgroundColor=chng;
		await sleep(d/2.0);
		document.getElementById(id1).style.backgroundColor=def;
		document.getElementById(id2).style.backgroundColor=def;
	}
}

/* mergeSort() : part of merge sort algorithm, divides the bars into groups recursively
   and merges them after sorting, --> O(logn) 
*/
async function mergeSort(l,r,d){
	if(l<r){
		let m=parseInt((l+r)/2);
		await mergeSort(l,m,d);
		await mergeSort(m+1,r,d);
	    await merge(l,m,r,d);
		
	}
}

/* MergeSort() : driver for mergeSort() */
async function MergeSort(){
	let delay=start();
	await mergeSort(0,bars.length-1,delay);
	fin();
}


// QUICK SORT

/* partition(): part of quick sort algorithm, it places the rth bar at the correct position 
   it should be in if the bars were all in sorted order, returns the partion position too. --> O(n)
*/
async function partition(l,r,d){
	let i=l-1,j=l;
	let id0=bars[r].split('id="')[1].split('"')[0];
	document.getElementById(id0).style.backgroundColor=selected;
	for(j=l;j<r;j++){
		if(parseInt(bars[j].split(/[:%]/)[1])<parseInt(bars[r].split(/[:%]/)[1])){
			i++;
			let id1=bars[i].split('id="')[1].split('"')[0], id2=bars[j].split('id="')[1].split('"')[0];
			document.getElementById(id1).style.backgroundColor=chng;
			document.getElementById(id2).style.backgroundColor=chng;
			let temp=bars[i];bars[i]=bars[j];bars[j]=temp;
			await sleep(d/3.0);
			container.innerHTML=bars.join('');
			document.getElementById(id1).style.backgroundColor=chng;
			document.getElementById(id2).style.backgroundColor=chng;
			document.getElementById(id0).style.backgroundColor=selected;
			await sleep(d/3.0)
			document.getElementById(id1 ).style.backgroundColor=def;
			document.getElementById(id2).style.backgroundColor=def;
		}
	}
	let temp=bars[i+1];bars[i+1]=bars[r];bars[r]=temp;
	container.innerHTML=bars.join(' ');
	document.getElementById(id0).style.backgroundColor=selected;
	await sleep(d/3.0);
	document.getElementById(id0).style.backgroundColor=def;
	return i+1;
}

/* quickSort() : part of quick sort algorithm, 
   divides the array of bars recursively depending on the partiotion position. --> O(logn)
*/
async function quickSort(l,r,d){
	if(l<r){
		let p=await partition(l,r,d);
		await quickSort(l,p-1,d);
		await quickSort(p+1,r,d);
	}
}

/* QuickSort() : driver for quickSort() */
async function QuickSort(){
	let delay=start();
	await quickSort(0,bars.length-1,delay);
	fin();
}
