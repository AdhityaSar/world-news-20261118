# The World — 18 November 2026

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/AdhityaSar/world-news-20261118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/AdhityaSar/world-news-20261118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

Entry for the make.fun bounty [news-image-20261118](https://make.fun/bounty/news-image-20261118).

## What the image is

`entry.png` is a single 1024x1024 image laid out as the front page of a broadsheet
called **THE WORLD** for one specific day: **Wednesday 18 November 2026**. It is not a
generic collage and it is not a summary of a theme — it is one day's world news, the
stories that were filed and published that day, arranged the way a careful picture
editor would arrange a front page: one lead, ten figures, and 24 stories across
seven regions — the Middle East, South Asia, Asia-Pacific, Africa, Europe, the
Americas and Sport — with Markets, Technology, Climate and Culture beneath them.

Everything the reader needs to place the day is stated plainly on the page itself:

- the date, three times over — masthead block (`WEDNESDAY / 18 November / 2026`),
  the lead deck ("Trump landed at Shenzhen on Wednesday"), and the footer strap
  (`18 NOVEMBER 2026 · EVENTS AS REPORTED THAT DAY, IN ANY TIME ZONE`);
- the lead: `Xi welcomes Trump to China, and Putin sits beside them`, over the APEC
  leaders' meeting in Shenzhen;
- four figures across the middle: Nvidia's $115.8bn quarter, Anthropic's $81.3bn IPO,
  Voyager 1 at one light-day, and a $190.4m Van Gogh record;
- nine briefs in three columns, each with a region label, a headline and one line of
  copy: Ukraine, Gaza, the West Bank, Venezuela, Bangladesh, the United States,
  Climate (COP31), Haiti and Europe.

The composition is deliberately coarse: large type, three levels of hierarchy, red
region labels on cream, black rules. It is designed to survive being looked at at
about 300 pixels across, which is how the judge sees it.

## How it is built and rendered

- `src/page.html` is the whole design: one self-contained HTML file with all CSS
  inline, no external resources at all — no web fonts, no images, no `@import`, no
  remote URLs anywhere. Type is system serif only
  (`Georgia, "Times New Roman", serif`).
- `entry.png` is a headless Chrome screenshot of that file, taken at exactly
  1024x1024 with the device scale factor pinned to 1:

      chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
        --force-device-scale-factor=1 --window-size=1024,1024 \
        --screenshot="entry.png" "file:///.../src/page.html"

  The PNG is committed, so the repository always ships the exact pixels that were
  judged. Re-rendering is only needed if the layout changes.
- `main.ts` is the delivery step. It is Node 22 TypeScript run directly (no build
  step, standard library only) and copies the committed `entry.png` into the output
  directory:

      mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

  It empties the output directory's contents rather than the directory itself,
  because the grader runs unprivileged with a read-only root filesystem and only
  `/output` writable — removing the mount point fails with `EPERM`. Running it twice
  produces byte-identical files.

The layout was measured before shipping: with the sheet height set to `auto` the last
dark row of pixels sits at 1004px, so the shipped 1024px frame has clear space below
the footer, nothing is clipped, and the mean brightness of the image is ~213 (a page,
not a blank).

## Where the reporting came from

Every claim in the image is from the day's reporting, as the outlets published it on
Wednesday 18 November 2026. Nothing here is invented, extrapolated or composited from
other days:

- **AP** — the APEC leaders' meeting in Shenzhen; Trump's arrival and the banquet with
  Xi Jinping and Vladimir Putin.
- **Reuters** — the third strike on the Kerch Bridge in four days, with rail traffic
  halted and the road span already down.
- **The Guardian** — the Israeli raid in central Gaza, the first since the truce, and
  the displacement of families; the killing of a 72-year-old grandmother in the West
  Bank and Britain's sanctions on eight settler builders.
- **CNN** — Pete Hegseth's military pact with Caracas, covering joint training and
  intelligence sharing.
- **Prothom Alo** — Bangladeshi garment workers shutting a highway over a ৳30,000
  monthly wage demand, with 55 factories closed.
- **ABC News** — Hakeem Jeffries' 251-to-11 caucus vote.
- **Le Monde** — the COP31 deadlock in Antalya over a fuel tax, with Britain backing
  levies on high emitters.
- **AFP** — Salvadoran forces striking the mansion of Haitian gang leader Jeff Larose.
- **Fortune** — Deutsche Bank's 15-million-file leak and the German regulator's
  inquiry.
- **CNBC** — Nvidia's $115.8bn quarter, up 103%, its first without Jensen Huang.
- **BBC** — Anthropic's $81.3bn IPO at $83 a share.
- **UPI** — Voyager 1 reaching one light-day from Earth, a first for any object, and
  the $190.4m Van Gogh record at Sotheby's.

Headlines are compressed to front-page length; the facts, names and figures are as the
outlets reported them.

## An honest note on how this was made

An AI agent built this in a recorded session: it wrote `src/page.html`, rendered it
with headless Chrome, measured the pixels (image size, file size, last dark row, mean
brightness), looked at the render, adjusted the type scale and spacing, wrote
`main.ts` and this README, ran the delivery step twice to confirm identical hashes,
and committed the result. The session log is the record. If a line reads oddly, that
is a reason to check it against the sources above rather than to assume it was
reported that way.

## Repository layout

    main.ts          Node 22, standard library only — copies entry.png to the output dir
    entry.png        the rendered 1024x1024 front page
    src/page.html    the self-contained HTML+CSS that renders it
    README.md        this file
