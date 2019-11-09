var jN9j12dsID = 0;
class fluid_select {
	constructor(select_id, param = {}) {
		this.myId = `jN9j12dsID-${++jN9j12dsID}`;
		this.select_id = select_id;
		let doner = $(`#${select_id}`);
		doner.css("display", "none");

		const {title, classNames, styles} = param;

		doner[0].insertAdjacentHTML('afterEnd',
      `<div class="fluid-select ${classNames!=undefined?classNames:''}"
      ${styles!=undefined?`style="${styles}"`:''}  tabindex="1" id="${this.myId}">
  			<div class="fluid-select-title">${title!=undefined?title:'выбор'}</div>
  			<div class="fluid-select-option_group">


				</div>
			</div>`);

		let opts = "";

		this.myOpt = 0;
		let myIdthis = this.myId;
		let select_idthis = this.select_id;
		fluid_select.createElem(doner, myIdthis, this.myOpt, myIdthis, select_idthis);
	}

	static createElem(elm, myId, myOpt, myIdthis, select_idthis){
		let toDrop = $(`#${myId} .fluid-select-option_group`)[0];


		let closeButton = document.createElement('div');
		closeButton.innerHTML = 'x';
		closeButton.className = 'xinclose_button';
		closeButton.addEventListener("click",  fluid_select.SelectIClose.bind(1, 0, myIdthis, 0, '', 0, true), false);
		toDrop.appendChild(closeButton);

		let myOPTGROUP = '';
		elm.find('option').each(
			function(i, el){
				//console.log(this.parentElement.tagName == 'OPTGROUP' );
				if (myOPTGROUP!=this.parentElement){
					myOPTGROUP = this.parentElement;
					if (this.parentElement.tagName == 'OPTGROUP' ){
						let xgroup = document.createElement('div');
						xgroup.innerHTML = this.parentElement.getAttribute('label');
						xgroup.className = 'OPTGROUPX';
						toDrop.appendChild(xgroup);
					}
				}

				let opx = document.createElement('div');
				let iHTML = '';
				iHTML = this.innerHTML;
				let valuedd = this.getAttribute('value');
				opx.value = valuedd;
				let value = el.value;
				opx.setAttribute('value', value);
				opx.addEventListener("click",  fluid_select.SelectIClose.bind(1, ++myOpt, myIdthis, select_idthis, iHTML, value, false), false);
				opx.innerHTML = iHTML;
				opx.className = this.tagName+'X';

				if (this.parentElement.tagName == 'OPTGROUP'){
					opx.className+=' ingrp';
				}

				toDrop.appendChild(opx);
			}
		);
	}


	static CloseFilter(myIdthis){
		console.log('87887');
		$(`#${myIdthis}`).blur();
		return false;

	}


	static SelectIClose(myOpt, myIdthis, select_idthis, iHTML, value = null, toClose = false){
		//console.log('------');
		//console.log(myIdthis);
		//console.log(select_idthis);
		//console.log(iHTML);
		//console.log(value);

		if(toClose){
			$(`#${myIdthis}`).blur();
			console.log('close');
			return false;
		}

		if(value == 'disabled'){
			return false;
		}

		let xs = $(`#${myIdthis} .fluid-select-title`);
		xs.html(iHTML);
		xs.attr('title', iHTML);
		$(`#${myIdthis}`).blur();
		$(`#${select_idthis}`)[0].selectedIndex = myOpt-1;
		$(`#${select_idthis}`).change().bind(1,'helo world');

		return false;

		//console.log(`$('#${select_idthis}')[0].selectedIndex = ${myOpt-1};`);
	}





	static createSelectFromClass(className){
		let g = 0;
		fluid_select.stack = {};
		$(`.${className}`).each(function(){
			if (this.tagName=='SELECT') {
				g++;
				let id = this.getAttribute('id');
				let classNames = this.getAttribute('class');
				let style = this.getAttribute('style');
				if (id == null){
					id = 'hidenSelect'+g
					this.setAttribute('id', id);
				}
				let valx = $(this).find("option:selected").text();
				fluid_select.stack[id] = new fluid_select(id, {
					title: valx,
					classNames: classNames,
					styles: style
				});
			}
		});
	}
}
