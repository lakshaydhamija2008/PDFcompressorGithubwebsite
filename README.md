# PDF Compressor website

A standalone React site for the PDF Compressor Android app. The build renders every page as static HTML so GitHub Pages can serve direct links to the feature guide, FAQ, contact, privacy policy, and terms.

## Preview

With Node.js 22 or newer, run these commands from this folder:

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4173/. To simulate a repository URL, set `PREVIEW_BASE` to the repository name before running preview.

## Publish on GitHub Pages

1. Create a separate GitHub repository for the website. Upload the contents of this folder to its root, including the hidden `.github` folder. GitHub Free supports Pages from public repositories.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source.
3. Under **Actions**, run **Deploy website to GitHub Pages** on the default branch. Later pushes to a default branch named `main` or `master` deploy automatically.
4. Open the URL shown by the deployment. Check `/privacy-policy/`, `/terms/`, and `/contact/` directly from a browser without signing in.

For a project repository, the policy URL typically looks like `https://OWNER.github.io/REPOSITORY/privacy-policy/`. Use the live URL in Play Console's privacy policy field and link to it from the Android app. Review the policy and terms against your release and support practices before publishing.

The workflow sets `SITE_URL` from GitHub Pages to generate canonical URLs and a sitemap. The deploy artifact contains only the website build.
