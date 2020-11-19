window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    //Tabs

    let tabs = document.querySelectorAll('.info-header-tab'),
        tabsParent = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent')
    ;

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    tabsParent.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tabs.length; i++) {
                if (target == tabs[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2020-11-29';

    function getTimeRemaining(endtime) {
        let t = Date.parse(deadline) - Date.now(), 
            seconds = Math.floor(t/1000 % 60),
            minutes = Math.floor(t/1000/60 % 60),
            hours = Math.floor(t/1000/60/60)
        ;

        return {
            'total' : t,
            'seconds' : seconds,
            'minutes' : minutes,
            'hours' : hours
        };
    }
    
    function setTimer(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateTimer, 1000)
        ;
        
        function updateTimer() {
            let t = getTimeRemaining(endtime);
            
            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }
    
    setTimer('timer', deadline);
    
    // Modal

    let descBtn = document.querySelectorAll('.description-btn'),
        more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close')
    ;

    function openModal() {
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    more.addEventListener('click', openModal);

    function closeModal() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    close.addEventListener('click', closeModal);

    descBtn.forEach((item) => {
        item.addEventListener('click', openModal);
    });
    

    // Form

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let formModal = document.querySelector('.main-form'),
        formContact = document.querySelector('#form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div')
    ;

    statusMessage.style.cssText = 'color: #fff;padding-top: 15px';

    function sendForm(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
                form.appendChild(statusMessage);
                let formData = new FormData(form);
                
                function postData(data) {
                    
                    return new Promise(function(resolve, reject) {
                        let request = new XMLHttpRequest();
                        
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            
                        // let obj = {};
                        // formData.forEach(function(value, key) {
                        //     obj[key] = value;
                        // });
                        // let json = JSON.stringify(obj);
            
                        request.send(formData); //json
                
                        request.addEventListener('readystatechange', function() {
                            if (request.readyState < 4) {
                                resolve();
                            } else if (request.readyState === 4 && request.status == 200) {
                                resolve();
                            } else {
                                reject();
                            }
                        });
                    });
                }
                
                function clearInput() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }

                postData(formData)
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(() => statusMessage.innerHTML = message.success)
                    .catch(() => statusMessage.innerHTML = message.failure)
                    .then(clearInput())
                ;
        });
    }
    
    sendForm(formModal);
    sendForm(formContact);

    //Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot')
    ;

    showSlide();

    let sliderInterval = setInterval(() => plusSlide(1), 5000);

    function resetInterval() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => plusSlide(1), 5000);
    }

    function showSlide(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        dots.forEach(item => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlide(n) {
        showSlide(slideIndex += n);
        resetInterval();
    }

    function currentSlide(n) {
        showSlide(slideIndex = n);
        resetInterval();
    }

    next.addEventListener('click', () => {
        plusSlide(1);
    });
    prev.addEventListener('click', () => {
        plusSlide(-1);
    });

    dotsWrap.addEventListener('click', (e) => {
        for (let i = 0; i < dots.length; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i]) {
                currentSlide(i + 1);
            }
        }
    });

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        days = document.querySelectorAll('.counter-block-input')[1],
        totalValue = document.getElementById('total'),
        place = document.getElementById('select'),
        personsSum = 0,
        daysSum = 0,
        total = 0
    ;

    totalValue.textContent = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 7000;

        if (days.value == '' || this.value == '') {
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = total;
        }
    });
    days.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 7000;

        if (persons.value == '' || this.value == '') {
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = total;
        }
    });

    place.addEventListener('change', function() {
        if (days.value == '' || persons.value == '') {
            totalValue.textContent = 0;
        } else {
            // let a = total;
            totalValue.textContent = total * this.options[this.selectedIndex].value;
        }
    });

});

