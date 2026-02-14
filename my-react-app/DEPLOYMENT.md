# 🚀 Deployment Guide

## Option 1: Netlify (Easiest - Recommended)

1. Build your project:
```bash
npm run build
```

2. Go to [netlify.com](https://netlify.com)
3. Sign up / Log in
4. Drag and drop the `/dist` folder
5. Done! You'll get a URL like: `https://your-site.netlify.app`

**Custom Domain (Optional):**
- Buy a domain from Namecheap/Google Domains
- In Netlify: Settings > Domain Management > Add custom domain

---

## Option 2: Vercel (Also Easy)

1. Build your project:
```bash
npm run build
```

2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy:
```bash
cd dist
vercel
```

4. Follow prompts, get instant URL!

---

## Option 3: GitHub Pages (Free)

1. Push your code to GitHub repository

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/valentine-for-ishi",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:
```bash
npm run deploy
```

---

## Option 4: Surge.sh (Super Fast)

1. Install Surge:
```bash
npm install -g surge
```

2. Build and deploy:
```bash
npm run build
cd dist
surge
```

3. Choose your subdomain: `valentine-for-ishi.surge.sh`

---

## 🔒 Keep It Secret!

**Before you send the link:**

1. Test on your phone
2. Make sure all photos loaded
3. Try all interactions
4. Read through content for typos
5. Don't share the link until Valentine's Day!

**Security Tip:**
If you want it extra private, deploy to Netlify/Vercel and use:
- Password protection (Netlify Pro feature)
- Or just keep the URL secret and share only with Ishi

---

## 📱 Sharing the Link

**Best Way to Share:**

1. Send via text message on Valentine's morning
2. Or create a QR code: [qr-code-generator.com](https://www.qr-code-generator.com)
3. Print QR code and attach to a card/gift
4. She scans it and sees your surprise!

**Message Ideas:**

"Happy Valentine's Day, Ishi! I made something special for you ♥ 
[your-link-here]"

"I couldn't find the words to express how I feel, so I built you this... 💝
[your-link-here]"

---

## 🐛 Troubleshooting Deployment

**Issue: Build fails**
- Make sure all dependencies are installed: `npm install`
- Check for errors in code
- Try deleting `node_modules` and reinstalling

**Issue: Photos not showing after deployment**
- Photos must be in `/public/images/`
- Paths must start with `/images/` not `./images/`
- Check file names match exactly (case-sensitive!)

**Issue: Site loads slow**
- Compress images before uploading (use TinyPNG)
- Keep images under 800px width
- Use WebP format if possible

**Issue: Animations stuttering**
- This is usually network/device specific
- Make sure images are optimized
- Test on multiple devices

---

## 📊 Analytics (Optional)

Want to know when she visits?

**Add Google Analytics:**

1. Get tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ Pre-Launch Checklist

Before sending to Ishi:

- [ ] All photos uploaded and loading correctly
- [ ] Timeline has your real milestones
- [ ] Letter is personalized
- [ ] Songs are your actual songs
- [ ] Tested on mobile device
- [ ] All interactions work (click, swipe, tap)
- [ ] Hero long-press easter egg works
- [ ] Love meter breaks at 100%
- [ ] No button runs away
- [ ] Confetti appears when she clicks Yes
- [ ] No typos or placeholder text remaining
- [ ] Link is easy to remember/share

---

## 🎉 You're Ready!

Your Valentine's website is built, customized, and deployed.

Now just wait for Valentine's Day to share it with Ishi! 💝

She's going to absolutely love it! ♥

Good luck! 🍀
