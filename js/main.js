window.addEventListener("load", function () {
  lenisAnimation();
  gsap.registerPlugin(ScrollTrigger);

  // 로딩 시작
  const loading = document.getElementById("loading");
  const body = document.body;
  const loadingText = document.querySelector(".loading-text");
  const countText = document.querySelector(".loading-text .count");

  const rawText = loadingText.childNodes[0].textContent.trim();
  loadingText.childNodes[0].remove();

  setTimeout(() => {
    loadingText.classList.add("visible");
  }, 200);

  rawText.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.animation = `typingFade 0.4s ease forwards`;
    span.style.animationDelay = `${i * 0.05}s`;
    loadingText.appendChild(span); 
  });

  let count = 0;
  const countUpInterval = setInterval(() => {
    if (count < 100) {
      count += 1;
      countText.textContent = `${count}%`;
    } else {
      clearInterval(countUpInterval);
    }
  }, 30);

  body.classList.add("loading-active");  // 로딩 시작 시 스크롤 비활성화

  setTimeout(() => {
    loadingText.style.transition = "opacity 0.2s ease-in-out";
    loadingText.style.opacity = "0";

    countText.style.transition = "opacity 0.2s ease-in-out";
    countText.style.opacity = "0";

    loading.classList.add("loading-close");

    setTimeout(() => {
      loading.remove();
      body.classList.remove("loading-active");  // 로딩 끝난 후 스크롤 활성화
    }, 3000);
  }, 3000);


  const customCursor1 = document.querySelector('.curser-wrap');
  const customCursor2 = document.querySelector('.curser-wrap .cursor');
  const mouseEventAreas = document.querySelectorAll('.mouse-event');
  const learnMore = document.querySelector('.curser-wrap .learn-more');
  const cursorIcon = document.querySelector('.curser-wrap i');

  // 커서 애니메이션
  document.addEventListener('mousemove', function (e) {
    if (window.innerWidth > 680) {
      gsap.to(customCursor1, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        duration: 0.1,
        overwrite: true
      });
    }
  });

  // a 태그와 button 태그에 호버 시 작은 커서 스케일 변경
  const hoverTargets = document.querySelectorAll('body a, body button');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => gsap.to(customCursor2, 0.1, { scale: 0.3, overwrite: true }));
    target.addEventListener('mouseleave', () => gsap.to(customCursor2, 0.1, { scale: 1, overwrite: true }));
  });

  // .mouse-event 영역에 호버 시 커서 내부 요소 나타나기/사라지기 애니메이션
  const mouseTl = gsap.timeline({ paused: true });
  if (cursorIcon) {
    mouseTl.to(cursorIcon, 0.1, { opacity: 1 });
  }
  if (learnMore) {
    mouseTl.to(learnMore, 0.1, { opacity: 1 });
  }

  mouseEventAreas.forEach(area => {
    area.addEventListener('mouseenter', () => mouseTl.play());
    area.addEventListener('mouseleave', () => mouseTl.reverse());
  });

  // video autoplay
  let video = document.getElementById("my_video");
  video.setAttribute("src", "video/bg.mp4");
  video.muted = true;
  video.addEventListener("loadeddata", () => video.play());
  video.addEventListener("ended", () => video.play());

  // Scroll effect for header
  let prevScrollY = window.scrollY;
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > prevScrollY) {
      header.classList.add('active');
    } else if (scrollY < prevScrollY) {
      header.classList.remove('active');
    }
    prevScrollY = scrollY;
  });

  const contactLink = document.querySelector("#main .bottom a");

  if (contactLink) {
    contactLink.addEventListener("click", function (e) {
      e.preventDefault(); // 앵커 기본 동작 막기
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    });
  }

  // Scroll - background opacity
  window.addEventListener('scroll', function () {
    const dim = document.querySelector('.dim');
    const about = document.querySelector('#about');
    const skills = document.querySelector('#skills');
    const scrollY = window.scrollY;
    const aboutTop = about.offsetTop;
    const aboutHeight = about.offsetHeight;
    const aboutBottom = aboutTop + aboutHeight;
    const skillsTop = skills.offsetTop;
    const skillsHeight = skills.offsetHeight;
    const skillsBottom = skillsTop + skillsHeight;

    if (scrollY < aboutTop) {
      let progress = scrollY / aboutTop;
      let newOpacity = 0.2 + progress * (1 - 0.2);
      dim.style.opacity = newOpacity;
    } else if (scrollY >= aboutTop && scrollY <= aboutBottom) {
      dim.style.opacity = 1;
    } else if (scrollY > aboutBottom && scrollY <= skillsBottom) {
      dim.style.opacity = 1;
    } else {
      dim.style.opacity = 0.2;
    }
  });

  // Open source section
  const visualData = document.querySelector('.main-visual-data');
  const visualItems = document.querySelectorAll('.main-visual-items');

  visualItems.forEach(item => item.classList.remove('actived'));
  if (visualItems.length > 0) visualItems[0].classList.add('actived');

  visualItems.forEach(item => {
    const itemVisualLink = item.querySelector('.item-visual');

    item.addEventListener('click', function () {
      visualItems.forEach(el => el.classList.remove('actived'));
      this.classList.add('actived');

      const itemRect = this.getBoundingClientRect();
      const containerRect = visualData.getBoundingClientRect();
      const scrollLeft = itemRect.left - containerRect.left - (containerRect.width - itemRect.width) / 2;

      visualData.scrollTo({ left: visualData.scrollLeft + scrollLeft, behavior: 'smooth' });
    });

    if (itemVisualLink) {
      itemVisualLink.addEventListener('click', e => {
        e.preventDefault();
        const onclickAttr = itemVisualLink.getAttribute('onclick');
        if (onclickAttr) {
          const functionCall = onclickAttr.substring(0, onclickAttr.indexOf(';'));
          eval(functionCall);
        }
      });
    }
  });

  // 모바일용 스와이프 감지
  let touchStartX = 0;
  let touchEndX = 0;

  visualData.addEventListener('touchstart', e => {
    if (window.innerWidth > 580) return;
    touchStartX = e.changedTouches[0].screenX;
  });

  visualData.addEventListener('touchend', e => {
    if (window.innerWidth > 580) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50; // 스와이프 인식 최소 거리(px)
    const activeIndex = [...visualItems].findIndex(item => item.classList.contains('actived'));
    if (activeIndex === -1) return;

    if (touchEndX < touchStartX - swipeThreshold) {
      // 왼쪽 스와이프 -> 다음 섹션
      const nextIndex = Math.min(activeIndex + 1, visualItems.length - 1);
      if (nextIndex !== activeIndex) {
        activateSection(nextIndex);
      }
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // 오른쪽 스와이프 -> 이전 섹션
      const prevIndex = Math.max(activeIndex - 1, 0);
      if (prevIndex !== activeIndex) {
        activateSection(prevIndex);
      }
    }
  }

  function activateSection(index) {
    visualItems.forEach(item => item.classList.remove('actived'));
    visualItems[index].classList.add('actived');

    const itemRect = visualItems[index].getBoundingClientRect();
    const containerRect = visualData.getBoundingClientRect();
    const scrollLeft = itemRect.left - containerRect.left - (containerRect.width - itemRect.width) / 2;

    visualData.scrollTo({ left: visualData.scrollLeft + scrollLeft, behavior: 'smooth' });
  }

  // Footer IntersectionObserver
  const footer = document.querySelector('footer');
  const trigger = document.querySelector('.ft_show');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("visible");
      } else {
        footer.classList.remove("visible");
      }
    });
  }, { threshold: 0.0000001 });

  observer.observe(trigger);

  // Lenis Scroll handling
  const gnb = document.querySelector("header nav");
  const menuList = gnb.querySelectorAll("ul li");
  const pageList = document.querySelectorAll("section");

  const lenis = new Lenis({ duration: 2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  let isLenisScrolling = false;
  let scrollTimer = null;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  function markScrollStopped() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      isLenisScrolling = false;
      enableMenu();
    }, 300);
  }

  function disableMenu() {
    gnb.classList.add("disable-click");
  }

  function enableMenu() {
    gnb.classList.remove("disable-click");
  }

  window.addEventListener("scroll", () => {
    if (!isLenisScrolling) {
      isLenisScrolling = true;
      disableMenu();
    }
    markScrollStopped();
  });

  menuList.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      if (isLenisScrolling) return;
      isLenisScrolling = true;
      disableMenu();
      lenis.scrollTo(pageList[i]);
      markScrollStopped();
    });
  });

  // ScrollTrigger
  pageList.forEach((item, i) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 20%",
        end: "bottom 20%",
        onEnter: () => controlMenu(i),
        onEnterBack: () => controlMenu(i)
      }
    });
  });

  function controlMenu(n) {
    menuList.forEach((item, i) => {
      if (i === n) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // 1. 모바일 전용 스킬/프로젝트용
  function initializeMobileScrollTrigger(selector) {
    const items = document.querySelectorAll(selector);

    if (window.innerWidth <= 680) {
      items.forEach((li, index) => {
        ScrollTrigger.create({
          trigger: li,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(items, index),
          onEnterBack: () => setActive(items, index),
        });
      });
    }
  }

  function setActive(itemList, activeIndex) {
    itemList.forEach((li, i) => {
      if (i === activeIndex) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }

  // 2. 모든 해상도에서 한 번만 등장하는 about용
  function initializeFadeInOnceTrigger(selector) {
    const items = document.querySelectorAll(selector);

    items.forEach((li) => {
      ScrollTrigger.create({
        trigger: li,
        start: "top 80%",
        once: true,
        onEnter: () => li.classList.add("active")
      });
    });
  }

  initializeMobileScrollTrigger("#skills .right li");
  initializeMobileScrollTrigger("#project1 .inner ul li");
  initializeFadeInOnceTrigger("#about .right li");


  const fadeTexts = document.querySelectorAll('.fade-text');

  fadeTexts.forEach((text, index) => {
    gsap.fromTo(text, 
      {
        opacity: 0.2,
      },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: text,
          start: "top 90%",
          end: "bottom 20%",
          scrub: true,
        }
      }
    );
  });
});
