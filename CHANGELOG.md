# Pink iPod SEO batch, 22 September 2026

Upload every file in this folder to the root of the GitHub repository, replacing the existing versions. No interview or article text was reworded; every visible text change is listed below.

## New files

1. `robots.txt`: allows all crawlers and points to the sitemap.
2. `sitemap.xml`: lists the homepage, Articles, Playlists, Where to get your music, Podcasts and all nine articles.
3. `bothsxdes.jpg`: your uploaded bsx.jpg, renamed to match the tile and compressed from 110 KB to 70 KB.
4. `bothsxdes.html` and `marcusframe_found.html`: your two missing pages, now live once uploaded.

## Every article page (9 files)

1. New title tag with the artist name first (headlines on the page unchanged).
2. Meta description, canonical link, Open Graph and Twitter card tags, so shares show the artist photo and a summary.
3. Structured data naming Juliette Cabanac as author and the artist as the subject, linked to their official Spotify, Apple Music and social profiles.
4. Language set to British English (`en-GB`).

## Page specific fixes

1. `thearmy-thenavy.html`: the Marcus Frame links were replaced by the band's own Spotify and Apple Music pages (verified against their discography). Their Instagram and YouTube were removed until you confirm the correct accounts.
2. `beastie.html`: added a "go and listen here" block with his Spotify and Apple Music (verified: the profile with Sofia, Hellscraper and mitcham mint).
3. `katestephenson.html`: the commented photo placeholder now points to `katestephenson.jpg`, the file actually on the server.
4. `maya-donovan.html`: removed a duplicated closing block at the end of the file.
5. `marcusframe_found.html`: the headline repeated "WANTED: Who is Marcus Frame ?" from the first article. It now reads "Marcus Frame : Found", matching its tile and title. Revert if the repetition was intentional.
6. `bothsxdes.html`, `marcusframe_found.html`, `agsully.html`, `thearmy-thenavy.html`, `marcus-frame.html`: repaired the HTML structure (a premature `</html>`, a stray `</div>`, and the back link sitting outside the page body). Nothing visible changes.
7. `playlist.html`: removed the unfinished "New group name" window and its dead link, plus the orphan `</div>`.
8. `where-to-get-your-music.html`: title corrected from "playlists".

## Navigation

1. `index.html`: new title and description; one discreet line under your intro: "latest interviews: Maya Donovan / Kate Stephenson / BEASTIE / bothsxdes". Delete that paragraph if you prefer the homepage untouched.
2. `diary-overview.html`: each tile title now sits inside its link, and four photo descriptions name the artist and city. `style.css` gained one rule so the tiles look exactly as before.

## Still open, your call

1. Article photos for BEASTIE, Maya Donovan and Kate Stephenson are uploaded but still commented out in the pages (the `image-article` style renders them as small 150 px squares). Search engines already get the photos through the share tags; showing them on the page is a design decision.
2. Publication dates are not set anywhere. Send them and I will add them to each page and to the structured data.
3. `thearmy-thenavy.html` contains "I would I would be excited" (a repeated fragment); left untouched.
4. `katestephenson.html` is about 1,500 words, far shorter than the other interviews. Check it is the final version.

# Update, 22 September 2026 (second pass)

1. Publication dates added under the headline (small grey line, new `.article-date` rule in `style.css`), in the structured data and in `sitemap.xml` for: Champion Trees (25 May 2026), A.G Sully (6 July 2026), bothsxdes (16 August 2026), BEASTIE (5 September 2026), Kate Stephenson (11 September 2026).
2. `diary-overview.html`: tiles now read "Kate Stephenson : If Phoebe Waller Bridge made music" and "Champion Trees : Long distance does work !!".
3. Article photos stay off the article pages, as decided; they remain in the share tags only.
4. Maya Donovan dated 16 September 2026 (page, structured data and sitemap).
5. Still to date: Marcus Frame (which of the two articles is 6 April 2026) and The Army, The Navy.

# Update, 22 September 2026 (third pass)

1. `thearmy-thenavy.html`: removed the dangling "I would" before "I would be excited" (pure deletion, nothing reworded).

# Update, 22 September 2026 (fourth pass): listening links

1. Every article now ends with the same set of links, in this order where they exist: Spotify, Apple Music, Tidal, Qobuz, Bandcamp, YouTube, Instagram. Each link was checked against the artist's own releases before being added, and the same links feed the structured data.
2. New icon `tidal.png` (from the free Simple Icons set, CC0 licence).
3. Icons resized for speed: the six existing icons drop from about 460 KB to about 45 KB in total, with no visible change at their display size. Bandcamp and Qobuz were trimmed of empty margins and display at 90 px wide (new `.wordmark` rule in `style.css`) so their names stay legible.
4. `maya-donovan.html`: her Spotify, Apple Music and YouTube icons pointed to files that do not exist on the site (`spotify.png`, `applemusic.png`, `youtube.png`) and showed as broken images. They now use the site's existing icons.

Gaps and caveats:

1. BEASTIE: no Instagram found that I could verify; no Bandcamp (beastie.bandcamp.com belongs to another artist).
2. bothsxdes: a Bandcamp page exists but is empty, so it was left out. A.G Sully: no Bandcamp found.
3. Marcus Frame (Tidal and Qobuz) and BEASTIE (Tidal and Qobuz): these platforms merge them with other artists of the same name, so their pages also show songs that are not theirs. The links are still the correct profiles.

# Update, 22 September 2026 (fifth pass)

1. `beastie.html`: Instagram added (@beastie). Tidal and Qobuz now open his latest single, mitcham mint (26 August 2026), instead of the profiles shared with another artist.
2. `marcus-frame.html` and `marcusframe_found.html`: Tidal and Qobuz now open his latest release, the ESMT EP (9 July 2026).
3. The shared Tidal and Qobuz profiles were removed from the structured data for both artists, so Google only receives profiles that are theirs alone.
4. A.G Sully has no Bandcamp: nothing to add.

# Update, 22 September 2026 (sixth pass): photos and RSS feed

1. Every article now ends with a small artist photo (200 px, rounded, with the artist's name as caption) just above the listening links. New `.artist-photo` rule in `style.css`. The old commented photo placeholders were removed.
2. Photos compressed for speed; BEASTIE drops from 140 KB to 32 KB and Kate Stephenson from 212 KB to 25 KB. The Articles page tiles use the same files and look unchanged.
3. New `feed.xml` (RSS feed of all nine articles, newest first), linked from the head of every main page.
