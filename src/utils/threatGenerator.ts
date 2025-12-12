import { Threat } from '../context/ThreatsContext';

const threatTypes: Threat['type'][] = ['virus', 'trojan', 'malware', 'ransomware', 'spyware'];
const severityLevels: Threat['severity'][] = ['low', 'medium', 'high', 'critical'];

const threatNames = {
  virus: [
    'Virus.Win32.Infector',
    'Virus.JS.Injector',
    'Virus.PDF.Exploit',
    'Virus.Doc.Macro',
    'Virus.HTML.Redirect',
  ],
  trojan: [
    'Trojan.Win32.Downloader',
    'Trojan.Banker.Stealer',
    'Trojan.Backdoor.Remote',
    'Trojan.Dropper.Payload',
    'Trojan.Spy.Keylogger',
  ],
  malware: [
    'Malware.JS.Cryptominer',
    'Malware.Browser.Hijacker',
    'Malware.Win.Rootkit',
    'Malware.Network.Botnet',
    'Malware.Android.Clicker',
  ],
  ransomware: [
    'Ransomware.Crypt.Locker',
    'Ransomware.Win.Petya',
    'Ransomware.Encoder.File',
    'Ransomware.JS.Blocker',
    'Ransomware.Mac.Finder',
  ],
  spyware: [
    'Spyware.Browser.DataCollector',
    'Spyware.Win.ScreenCapture',
    'Spyware.Mobile.Tracker',
    'Spyware.Mac.Keylogger',
    'Spyware.IoT.DataStealer',
  ],
};

const filePaths = [
  '/uploads/document.pdf',
  '/uploads/presentation.pptx',
  '/downloads/installer.exe',
  '/documents/contract.docx',
  '/images/photo.jpg',
  '/scripts/analytics.js',
  '/browser/extensions/addon.js',
  '/system/drivers/device.sys',
  '/temp/cache.tmp',
  '/uploads/archive.zip',
];

const fileSizes = [
  '24 KB',
  '156 KB',
  '1.2 MB',
  '3.5 MB',
  '67 KB',
  '890 KB',
  '2.3 MB',
  '45 KB',
  '124 KB',
  '5.7 MB',
];

const descriptions = {
  virus: [
    'Malicious code that infects files and replicates itself across the system.',
    'Self-replicating virus that attaches to executable files.',
    'Virus that corrupts system files and degrades performance.',
    'Polymorphic virus that changes its code to avoid detection.',
    'Boot sector virus that activates before the operating system loads.',
  ],
  trojan: [
    'Trojan that provides unauthorized remote access to the system.',
    'Banking trojan designed to steal financial credentials.',
    'Trojan that downloads additional malware components.',
    'Disguised as legitimate software but contains hidden malicious functionality.',
    'Trojan that logs keystrokes and captures sensitive information.',
  ],
  malware: [
    'Malicious software that mines cryptocurrency using system resources.',
    'Malware that modifies browser settings and redirects searches.',
    'Malware that hides deep within the system to avoid detection.',
    'Connects the infected system to a botnet for coordinated attacks.',
    'Malware that performs unauthorized clicks and ad fraud.',
  ],
  ransomware: [
    'Encrypts files and demands payment for decryption keys.',
    'Locks the entire system and displays a ransom demand screen.',
    'Ransomware that threatens to publish sensitive data unless paid.',
    'Encrypts files with a deadline for payment before deletion.',
    'Targets specific file types for encryption based on value.',
  ],
  spyware: [
    'Collects browsing history and form data without consent.',
    'Captures screenshots of user activity at regular intervals.',
    'Tracks location and monitors communication on mobile devices.',
    'Records keystrokes to capture passwords and sensitive information.',
    'Extracts personal data from connected smart devices.',
  ],
};

export const generateRandomThreat = (): Omit<Threat, 'id' | 'detectedAt'> => {
  const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
  const nameOptions = threatNames[type];
  const name = nameOptions[Math.floor(Math.random() * nameOptions.length)];
  const location = filePaths[Math.floor(Math.random() * filePaths.length)];
  const fileSize = fileSizes[Math.floor(Math.random() * fileSizes.length)];
  const descriptionOptions = descriptions[type];
  const description = descriptionOptions[Math.floor(Math.random() * descriptionOptions.length)];

  return {
    name,
    type,
    severity,
    status: 'active',
    location,
    fileSize,
    description,
  };
};