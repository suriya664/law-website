# GitHub Deployment Guide for LawFIRM Template

## 📦 Quick Deployment to GitHub Pages

### Step 1: Prepare Your Repository

1. **Create a new repository on GitHub:**
   - Go to [GitHub](https://github.com)
   - Click "New Repository"
   - Name it (e.g., `lawfirm-website`)
   - Choose Public or Private
   - **DO NOT** initialize with README (we already have one)

### Step 2: Upload Your Files

**Option A: Using Git Command Line**

```bash
# Navigate to your project folder
cd path/to/lawfirm-template

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: LawFIRM template"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/lawfirm-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Option B: Using GitHub Desktop**

1. Open GitHub Desktop
2. File → Add Local Repository
3. Choose your lawfirm-template folder
4. Click "Publish Repository"
5. Choose repository name and visibility
6. Click "Publish Repository"

**Option C: Using GitHub Web Interface**

1. Go to your repository
2. Click "Upload files"
3. Drag and drop all files from lawfirm-template folder
4. Commit changes

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)` or `/docs` (if you moved pages there)
4. Click **Save**
5. Wait 2-3 minutes for deployment

### Step 4: Update File Paths (Important!)

Since GitHub Pages serves from root, update paths in your HTML files:

**Change this:**
```html
<script src="../assets/js/main.js"></script>
<link rel="stylesheet" href="../assets/css/style.css">
```

**To this:**
```html
<script src="assets/js/main.js"></script>
<link rel="stylesheet" href="assets/css/style.css">
```

Or move all pages from `/pages` folder to root directory.

### Step 5: Access Your Live Site

Your site will be available at:
```
https://yourusername.github.io/lawfirm-website
```

## 🔧 Project Structure for GitHub Pages

### Recommended Structure:

```
lawfirm-website/          (Root - GitHub Pages serves from here)
├── index.html           (Homepage - must be in root)
├── about.html
├── attorneys.html
├── contact.html
├── ... (other pages)
├── assets/
│   ├── css/
│   ├── js/
│   └── img/
├── partials/
├── docs/
└── README.md
```

## 🌐 Custom Domain (Optional)

1. Buy a domain from any registrar
2. In repository Settings → Pages → Custom domain
3. Enter your domain (e.g., `lawfirm.in`)
4. Update DNS records at your registrar:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```
5. Add CNAME file in root with your domain name

## 📝 Important Notes

- **Partials Loading**: GitHub Pages doesn't support server-side includes. The fetch() method used in the template works fine for loading partials.
- **AJAX Forms**: Connect forms to a backend service (e.g., Formspree, EmailJS) for functionality.
- **HTTPS**: GitHub Pages automatically provides HTTPS.
- **Build Time**: Usually 2-3 minutes after pushing changes.

## 🚀 Alternative Free Hosting Options

- **Netlify**: Drag & drop deployment
- **Vercel**: Git-based deployment
- **Firebase Hosting**: Google's hosting service
- **Render**: Free static site hosting

## 🔄 Updating Your Site

To update your live site:

```bash
# Make changes to your files
# Then commit and push

git add .
git commit -m "Update content"
git push origin main
```

Changes will be live in 2-3 minutes.

## ✅ Checklist Before Going Live

- [ ] Replace all dummy images with actual images
- [ ] Update all text content (names, addresses, etc.)
- [ ] Update contact information
- [ ] Test all forms
- [ ] Check all internal links
- [ ] Test on mobile devices
- [ ] Add Google Analytics (optional)
- [ ] Create favicon.ico
- [ ] Update meta descriptions for SEO
- [ ] Test dark mode
- [ ] Test RTL mode (if needed)

## 🆘 Troubleshooting

**Issue**: Pages show but CSS/JS not loading
- **Fix**: Check file paths - they should be relative to root

**Issue**: Images not displaying
- **Fix**: Ensure images are in assets/img/ and paths are correct

**Issue**: Partials not loading
- **Fix**: Ensure you're using a web server (GitHub Pages works fine)

**Issue**: 404 errors
- **Fix**: Check that index.html is in root directory

---

Need help? Check docs/documentation.html or README.txt

