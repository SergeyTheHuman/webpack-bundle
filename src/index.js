import { post } from './post.js'
import Swiper from 'swiper/bundle'
import './styles/styles.sass'
import './index.pug'

post()

const swiper = new Swiper('.asd', {
	slidesPerView: 1,
	spaceBetween: 30,
	pagination: {
		el: '.swiper-pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},
})
const swiper2 = new Swiper('.asdasd', {
	slidesPerView: 1,
	spaceBetween: 30,
	pagination: {
		el: '.swiper-pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},
})

const arr = [1, 2, 3, 4, 5]
arr.map((item) => item * 2)

async function asd() {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve('готово!'), 1000)
	})

	const mydata = await promise

	console.log(mydata)
	return mydata
}

asd()

console.log('asd1')
console.log('asd2')
console.log('asd3')
console.log('asd4')
