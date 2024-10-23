document.addEventListener('DOMContentLoaded', () => {
  const emailSection = document.getElementById('emailSection');
  const codeSection = document.getElementById('codeSection');
  const sendCodeBtn = document.getElementById('sendCodeBtn');
  const verifyCodeBtn = document.getElementById('verifyCodeBtn');
  const emailInput = document.getElementById('emailInput');
  const codeBoxes = document.querySelectorAll('.code-box');
  const feedbackMessage = document.getElementById('feedbackMessage');

  let verificationCode = '';

  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  
  function generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  
  function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = type;
    feedbackMessage.classList.remove('hidden');
  }

  
  function sendEmail(email, code) {
    console.log("Sending email to:", email); 
    console.log("Generated verification code:", code); 

    emailjs.send('service_hoxkphi', 'template_pco76zg', {
      to_email: email,
      verification_code: code
    }).then(response => {
      console.log("EmailJS response:", response); 
      showFeedback("Verification code sent successfully!", "success");
    }).catch(error => {
      console.error("Error sending email:", error); 
      showFeedback("Failed to send verification code. Please try again.", "error");
    });
  }

  
  sendCodeBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (isValidEmail(email)) {
      verificationCode = generateCode(); 
      emailSection.classList.add('hidden'); 
      codeSection.classList.remove('hidden'); 
      sendEmail(email, verificationCode); 
    } else {
      showFeedback('Please enter a valid email address.', 'error');
    }
  });

  
  verifyCodeBtn.addEventListener('click', () => {
    const enteredCode = Array.from(codeBoxes).map(box => box.value).join('');
    console.log("Entered code:", enteredCode); 
    if (enteredCode === verificationCode) {
      showFeedback('Verification Successful!', 'success');
    } else {
      showFeedback('Invalid Code. Please try again.', 'error');
      codeBoxes.forEach(box => box.value = ''); 
      codeBoxes[0].focus(); 
    }
  });

  
  codeBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
      if (e.target.value) {
        if (index < codeBoxes.length - 1) {
          codeBoxes[index + 1].focus(); 
        } else {
          verifyCodeBtn.focus(); 
        }
      }
    });

    
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        codeBoxes[index - 1].focus(); 
      }
    });

    
    box.addEventListener('paste', (e) => {
      const pastedData = e.clipboardData.getData('text').toUpperCase(); 
      const codeArray = pastedData.split('').slice(0, codeBoxes.length - index); 
      codeArray.forEach((char, i) => {
        if (codeBoxes[index + i]) {
          codeBoxes[index + i].value = char; 
        }
      });
      
      codeBoxes[Math.min(index + codeArray.length, codeBoxes.length - 1)].focus();
      e.preventDefault(); 
    });
  });

  
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particles';
  document.body.appendChild(particleContainer);

  for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particleContainer.appendChild(particle);
  }

  
  const usernameDisplay = document.createElement('div');
  usernameDisplay.className = 'username-display';
  usernameDisplay.textContent = 'Ibalh0';
  document.body.appendChild(usernameDisplay);
});