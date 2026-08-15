const translations = {
  tr: { aboutNav: 'Hakkımda', projectsNav: 'Projeler', contactNav: 'İletişim', collab: 'Birlikte yapalım <span>↗</span>', kicker: 'TASARIM · KOD · MERAK', heroTitle: 'Fikirleri<br><i>harekete</i><br>geçiriyorum.', intro: 'Ben Nuriddin. Web deneyimleri, oyun fikirleri ve insanlara dokunan dijital şeyler yapıyorum.', seeWork: 'Çalışmalarımı gör <span>↓</span>', aboutLabel: '01 / HAKKIMDA', aboutTitle: 'Meraklı bir zihin,<br><i>somut işler.</i>', aboutText: 'Yeni şeyler öğrenmeyi, fikirleri denemeyi ve kodu yaratıcı bir araca dönüştürmeyi seviyorum. Küçük bir oyundan kişisel bir web sitesine kadar her projede eğlenceyi ve sadeliği birlikte arıyorum.', workLabel: '02 / SEÇİLİ İŞLER', now: '2026 — şimdi', gameTag: '02 · OYUN', publishTitle: 'Yayın<br>Atölyesi', publishText: 'Fikirlerini dosyadan canlı bir siteye taşıyan kişisel platform.', basketText: 'Fareyle topu çek, gücü ayarla ve potaya gönder.', labTitle: 'Yeni<br>şeyler.', labText: 'Yakında burada daha fazla deney ve atraksiyon olacak.', contactLabel: '03 / İLETİŞİM', contactTitle: 'Bir fikrin mi var?<br><i>Konuşalım.</i>', footer: 'Merakla yapıldı.' },
  en: { aboutNav: 'About', projectsNav: 'Projects', contactNav: 'Contact', collab: 'Let’s work together <span>↗</span>', kicker: 'DESIGN · CODE · CURIOSITY', heroTitle: 'I turn ideas<br>into <i>motion.</i>', intro: 'I’m Nuriddin. I make web experiences, game ideas and digital things that connect with people.', seeWork: 'See my work <span>↓</span>', aboutLabel: '01 / ABOUT', aboutTitle: 'A curious mind,<br><i>real things.</i>', aboutText: 'I love learning, testing ideas and turning code into a creative tool. From a small game to a personal website, I look for fun and simplicity in every project.', workLabel: '02 / SELECTED WORK', now: '2026 — now', gameTag: '02 · GAME', publishTitle: 'Publishing<br>Studio', publishText: 'A personal platform that turns files into a live website.', basketText: 'Pull the ball, set the power and shoot it through the hoop.', labTitle: 'New<br>things.', labText: 'More experiments and creative attractions are coming soon.', contactLabel: '03 / CONTACT', contactTitle: 'Have an idea?<br><i>Let’s talk.</i>', footer: 'Made with curiosity.' }
};
const language = document.querySelector('#language');
function setLanguage(value) {
  document.documentElement.lang = value;
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.innerHTML = translations[value][element.dataset.i18n]; });
  localStorage.setItem('portfolio-language', value);
}
language.value = localStorage.getItem('portfolio-language') || 'tr';
language.addEventListener('change', (event) => setLanguage(event.target.value));
setLanguage(language.value);

const codeEditor = document.querySelector('#code-editor');
const codeLanguage = document.querySelector('#code-language');
const codePreview = document.querySelector('#code-preview');
const codeOutput = document.querySelector('#code-output');
const lineCount = document.querySelector('#line-count');
const languageStatus = document.querySelector('#language-status');
const starterCode = {
  html: '<main><h1>Merhaba Rıza Ali</h1><p>İlk HTML denemem.</p></main>',
  css: 'body {\n  background: #10252b;\n  color: #62e6dc;\n  font: 24px sans-serif;\n}',
  javascript: "document.body.innerHTML = '<h1>JavaScript çalışıyor!</h1>';",
  python: "print('Merhaba Rıza Ali')\nprint('Python kodun hazır.')",
  cpp: '#include <iostream>\nint main() {\n  std::cout << "Merhaba";\n}',
  java: 'class Main {\n  public static void main(String[] args) {\n    System.out.println("Merhaba");\n  }\n}',
  json: '{\n  "isim": "Rıza Ali Emniyetli",\n  "dil": "JSON"\n}'
};
function updateEditorStatus() {
  lineCount.textContent = `${codeEditor.value.split('\n').length} satır`;
  languageStatus.textContent = `${codeLanguage.value.toUpperCase()} hazır`;
}
function loadStarterCode() {
  codeEditor.value = starterCode[codeLanguage.value];
  updateEditorStatus();
  codeOutput.textContent = 'Kodunu yazıp Çalıştır butonuna bas.';
  codePreview.srcdoc = '';
}
function runCode() {
  const language = codeLanguage.value;
  const code = codeEditor.value;
  updateEditorStatus();
  if (language === 'html') {
    codePreview.srcdoc = code;
    codeOutput.textContent = 'HTML önizlemesi güncellendi.';
  } else if (language === 'css') {
    codePreview.srcdoc = `<style>${code}</style><main><h1>CSS önizlemesi</h1><p>Stilin burada görüntüleniyor.</p></main>`;
    codeOutput.textContent = 'CSS önizlemesi güncellendi.';
  } else if (language === 'javascript') {
    codePreview.srcdoc = `<body><script>${code.replaceAll('</script>', '<\\/script>')}<\/script></body>`;
    codeOutput.textContent = 'JavaScript önizlemesi çalıştırıldı.';
  } else if (language === 'json') {
    try { codeOutput.textContent = JSON.stringify(JSON.parse(code), null, 2); codePreview.srcdoc = `<pre>${codeOutput.textContent}</pre>`; }
    catch (error) { codeOutput.textContent = `JSON hatası: ${error.message}`; }
  } else {
    codeOutput.textContent = `${language.toUpperCase()} kodu yazıldı. Bu tarayıcı alanında güvenli şekilde derlenmez; kodunu kopyalayıp kendi çalışma ortamında çalıştırabilirsin.`;
  }
}
codeLanguage.addEventListener('change', loadStarterCode);
codeEditor.addEventListener('input', updateEditorStatus);
document.querySelector('#run-code').addEventListener('click', runCode);
document.querySelector('#clear-code').addEventListener('click', () => { codeEditor.value = ''; updateEditorStatus(); codePreview.srcdoc = ''; codeOutput.textContent = 'Kod alanı temizlendi.'; });
loadStarterCode();
