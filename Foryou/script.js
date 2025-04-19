let nama, val;
const url_string = document.URL;
const url = new URL(url_string);
let sender;

// Mendapatkan parameter 'by' dari URL atau menggunakan default
sender = url.searchParams.get('by') || "Erzam";

// Create floating hearts
function createFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const heartCount = 15;
  
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 10 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
    container.appendChild(heart);
  }
}

// Initialize floating hearts
createFloatingHearts();

// Preload couple image - Using a more reliable image source
const coupleImage = new Image();
coupleImage.src = 'https://i.imgur.com/dMbVw95.jpg'; // Reliable hosted cute couple image

// Check if we're on mobile
const isMobile = window.innerWidth <= 768;

// Adjust confetti amount for mobile
const particleMultiplier = isMobile ? 0.5 : 1;

// Menambahkan event listener untuk tombol
document.querySelector(".tombol").addEventListener('click', function () {
  // Add audio with lower volume on mobile
  const bgMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  bgMusic.volume = isMobile ? 0.2 : 0.3;
  bgMusic.loop = true;
  bgMusic.play().catch(e => console.log("Audio couldn't autoplay: ", e));

  // Custom SweetAlert styling
  Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary px-4 mx-2',
      denyButton: 'btn btn-secondary px-4 mx-2'
    },
    buttonsStyling: false
  });

  Swal.fire({
    title: "Hallo",
    text: "Aku ada pertanyaan nih buat kamu",
    icon: "question",
    confirmButtonText: "Lanjut",
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  }).then(function () {
    Swal.fire({
      title: "Jawab yang jujur ya!",
      confirmButtonText: "Siap!",
      showClass: {
        popup: 'animate__animated animate__bounceIn'
      }
    }).then(function () {
      Swal.fire({
        title: "Awas aja kalau kamu bohong",
        icon: "warning",
        confirmButtonText: "Oke deh",
        showClass: {
          popup: 'animate__animated animate__shakeX'
        }
      }).then(function () {
        
        // Meminta pengguna untuk memasukkan nama
        Swal.fire({
          title: 'Masukin nama kamu dulu',
          input: 'text',
          inputPlaceholder: 'Nama kamu...',
          confirmButtonText: 'Lanjut',
          inputValidator: (value) => {
            if (!value) {
              return 'Isi dulu dong beb';
            } else {
              nama = value;
            }
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn'
          }
        }).then(function () {
          // Menanyakan apakah pengguna sayang kepada sender
          Swal.fire({
            title: `${nama} sayang ga sama ${sender}?`,
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: `Sayang ❤️`,
            denyButtonText: `Enggak 💔`,
            showClass: {
              popup: 'animate__animated animate__bounceIn'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `${sender} juga sayang banget sama ${nama}`,
                icon: 'success',
                confirmButtonText: 'Lanjut',
                showClass: {
                  popup: 'animate__animated animate__heartBeat'
                }
              }).then(function () {
                // Menanyakan seberapa sayang
                Swal.fire({
                  title: 'Seberapa sayang emangnya?',
                  icon: 'question',
                  input: 'range',
                  inputAttributes: {
                    min: 1,
                    max: 100,
                    step: 1
                  },
                  inputValue: 50,
                  showClass: {
                    popup: 'animate__animated animate__fadeIn'
                  }
                }).then((e) => {
                  val = e.value;
                  
                  // Show hearts animation based on love percentage - reduce on mobile
                  const extraHearts = Math.floor((val / 10) * particleMultiplier);
                  for (let i = 0; i < extraHearts; i++) {
                    setTimeout(() => {
                      confetti();
                    }, i * 300);
                  }
                  
                  Swal.fire({
                    title: `Makasih ya udah sayang sama ${sender} ${val}%`,
                    text: val > 80 ? "Wah kamu sayang banget ya sama aku!" : 
                           val > 50 ? "Aku juga sayang kamu!" : 
                           "Aku akan berusaha biar kamu lebih sayang lagi sama aku!",
                    icon: 'love',
                    iconHtml: '❤️',
                    confirmButtonText: 'Lanjut',
                    showClass: {
                      popup: 'animate__animated animate__bounceIn'
                    }
                  }).then(function () {
                    // Menanyakan apakah pengguna kangen
                    Swal.fire({
                      title: `Sekarang ${nama} kangen ga sama ${sender}?`,
                      icon: 'question',
                      showDenyButton: true,
                      confirmButtonText: `Kangen ❤️`,
                      denyButtonText: `Enggak 💔`,
                      showClass: {
                        popup: 'animate__animated animate__fadeIn'
                      }
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          title: `Huhu iya ${sender} juga kangen ${nama}`,
                          text: "Makasih ya udah kangen sama aku!",
                          icon: 'success',
                          confirmButtonText: 'Lanjut',
                          showClass: {
                            popup: 'animate__animated animate__heartBeat'
                          }
                        }).then(function () {
                          Swal.fire({
                            title: 'Terakhir deh sayang',
                            text: 'Aku punya sesuatu buat kamu',
                            confirmButtonText: 'Apa itu?',
                            showClass: {
                              popup: 'animate__animated animate__bounceIn'
                            }
                          }).then(function () {
                            Swal.fire({
                              title: 'Coba klik ikon hati di paling bawah dong',
                              text: 'Ada kejutan spesial untuk kamu',
                              confirmButtonText: 'Oke!',
                              showClass: {
                                popup: 'animate__animated animate__fadeIn'
                              }
                            });
                          });
                        });
                      } else if (result.isDenied) {
                        Swal.fire({
                          title: 'Yahhh, emang ga kangen sama pacar sendiri',
                          text: 'Aku selalu kangen kamu setiap hari',
                          icon: 'error',
                          confirmButtonText: 'Maaf',
                          showClass: {
                            popup: 'animate__animated animate__shakeX'
                          }
                        }).then(function () {
                          Swal.fire({
                            title: 'Yaudah deh okee sayangg',
                            text: 'Aku tetap sayang kamu kok',
                            icon: 'info',
                            confirmButtonText: 'Lanjut',
                            showClass: {
                              popup: 'animate__animated animate__fadeIn'
                            }
                          }).then(function() {
                            Swal.fire({
                              title: 'Coba klik ikon hati di paling bawah dong',
                              text: 'Ada kejutan spesial untuk kamu',
                              confirmButtonText: 'Oke!',
                              showClass: {
                                popup: 'animate__animated animate__fadeIn'
                              }
                            });
                          });
                        });
                      }
                    });
                  });
                });
              });
            } else if (result.isDenied) {
              Swal.fire({
                title: `Yakin ga suka sama ${sender}?`,
                text: 'Coba pikir lagi deh...',
                icon: 'error',
                confirmButtonText: 'Iya deh, aku sayang',
                showClass: {
                  popup: 'animate__animated animate__shakeX'
                }
              }).then(function () {
                Swal.fire({
                  title: 'Nah gitu dong!',
                  text: 'Aku tau kamu pasti sayang sama aku',
                  icon: 'success',
                  confirmButtonText: 'Lanjut',
                  showClass: {
                    popup: 'animate__animated animate__bounceIn'
                  }
                }).then(function() {
                  // Redirect to the confirmed path
                  Swal.fire({
                    title: 'Coba klik ikon hati di paling bawah dong',
                    text: 'Ada kejutan spesial untuk kamu',
                    confirmButtonText: 'Oke!',
                    showClass: {
                      popup: 'animate__animated animate__fadeIn'
                    }
                  });
                });
              });
            }
          });
        });
      });
    });
  });
});

// Menambahkan event listener untuk ikon hati
document.querySelector('.hati').addEventListener('click', function () {
  // Trigger multiple confetti bursts - fewer on mobile
  const burstCount = isMobile ? 3 : 5;
  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => {
      confetti();
    }, i * 300);
  }
  
  // Show the message and image
  const teks = document.getElementById('teks');
  const btn = document.querySelector('.tombol');
  const loveMessage = document.getElementById('loveMessage');
  const coupleImage = document.getElementById('coupleImage');
  
  btn.classList.add('d-none');
  teks.classList.remove('d-none');
  loveMessage.classList.remove('d-none');
  
  // Show the couple image with a delay
  setTimeout(() => {
    coupleImage.src = 'https://i.imgur.com/dMbVw95.jpg'; // Using Imgur for reliable hosting
    coupleImage.classList.remove('d-none');
    coupleImage.classList.add('animate__animated', 'animate__fadeIn');
    
    // Add error handling for image
    coupleImage.onerror = function() {
      // If image fails to load, try a fallback
      this.src = 'https://i.imgur.com/JR8qMSe.jpg';
      
      // If that also fails, show a heart emoji instead
      this.onerror = function() {
        const imageContainer = document.querySelector('#loveMessage .mt-4');
        imageContainer.innerHTML = '<div class="display-1 text-danger">❤️</div>';
      };
    };
  }, 1000);
  
  // Play a special sound - lower volume on mobile
  const specialSound = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
  specialSound.volume = isMobile ? 0.3 : 0.5;
  specialSound.play().catch(e => console.log("Audio couldn't autoplay: ", e));
});

// Konfigurasi confetti - adjust for mobile
'use strict';
var onlyOnKonami = false;

function confetti() {
  var $window = $(window),
      random = Math.random,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      PI2 = PI * 2,
      timer = undefined,
      frame = undefined,
      confetti = [];

  var runFor = 2000;
  var isRunning = true;

  setTimeout(() => {
    isRunning = false;
  }, runFor);

  // Pengaturan warna dan ukuran confetti - adjust for mobile
  var particles = isMobile ? 75 : 150, // Fewer particles on mobile
      spread = 20,
      sizeMin = isMobile ? 3 : 5, // Smaller confetti on mobile
      sizeMax = (isMobile ? 8 : 12) - sizeMin,
      eccentricity = 10,
      deviation = 100,
      dxThetaMin = -.1,
      dxThetaMax = -dxThetaMin - dxThetaMin,
      dyMin = .13,
      dyMax = .18,
      dThetaMin = .4,
      dThetaMax = .7 - dThetaMin;

  var colorThemes = [
    function () { return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0); },
    function () { var black = 200 * random() | 0; return color(200, black, black); },
    function () { var black = 200 * random() | 0; return color(black, 200, black); },
    function () { var black = 200 * random() | 0; return color(black, black, 200); },
    function () { return color(200, 100, 200 * random() | 0); },
    function () { return color(200 * random() | 0, 200, 200); },
    function () { var black = 256 * random() | 0; return color(black, black, black); },
    function () { return colorThemes[random() < .5 ? 1 : 2](); },
    function () { return colorThemes[random() < .5 ? 3 : 5](); },
    function () { return colorThemes[random() < .5 ? 2 : 4](); }
  ];

  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // Fungsi untuk interpolasi
  function interpolation(a, b, t) {
    return (1 - cos(PI * t)) / 2 * (b - a) + a;
  }

  // Membuat Poisson Disc
  function createPoisson() {
    var radius = 1 / eccentricity,
        radius2 = radius + radius,
        domain = [radius, 1 - radius],
        measure = 1 - radius2,
        spline = [0, 1];

    while (measure) {
      var dart = measure * random(),
          i, l, interval, a, b, c, d;

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i + 1], interval = b - a;
        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }
        measure += interval;
      }
      c = dart - radius, d = dart + radius;

      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1, a = domain[l], b = domain[i];
        if (a >= c && a < d) {
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2); // Delete interval
        } else if (a < c && b > c) {
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
        }
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  // Membuat kontainer untuk confetti
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  // Konstruktor confetto
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
        innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = this.frame % 7777 / 7777,
          i = 0,
          j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti
      var theme = colorThemes[0],
          count = 0;
      (function addConfetto() {
        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);
          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);

      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  poof();
}

// Add window resize listener to update mobile detection
window.addEventListener('resize', function() {
  isMobile = window.innerWidth <= 768;
});
