---
locale: "ja"
title: "1枚の古写真から360度パノラマを制作する"
description: "インターンシップで作成した、古い写真をAIをつかって360度のパノラマビューにするという挑戦の記録。"
publishedAt: 2026-09-29
cover: "../../../assets/images/blog/03-Panorama/panorama-view-03-thumbnail.webp"
coverAlt: "歴史的な白黒写真を使った没入型バーチャルツアーのサムネイル"
coverVideoFallback: "/videos/blog/panorama-view-03-thumbnail.mp4"
tags: ["Development", "Design", "Internship"]
---

### 静止画よりも没入感のある体験を作る

インターンシップの一環として、上司から360度パノラマを使ったバーチャルツアーの制作を依頼されました。クライアントのWebサイトで歴史資料を紹介するためのアイデアのひとつでした。

<a class="blog-demo-link" href="https://panorama-viewer-v3-0.vercel.app/" target="_blank" rel="noopener noreferrer">
  <span>私が制作した360度パノラマビューアを見る</span>
  <span aria-hidden="true">↗</span>
</a>

使用したのは、フレーザー川をはじめとするバンクーバーの自然風景や、約100年前にそこで暮らしていた人々を写した複数の白黒写真です。

![元画像として使用した歴史写真](../../../assets/images/blog/03-Panorama/sample.webp)
*パノラマ生成の元画像として使用した歴史写真。*

<iframe
  src="/panorama/blog-03"
  title="歴史写真を使ったインタラクティブな360度パノラマ"
  loading="lazy"
  allow="fullscreen; gyroscope; accelerometer"
  allowfullscreen
  style="display: block; width: 100%; aspect-ratio: 16 / 9; margin-top: 1rem; border: 0;"
></iframe>

### AIで写真に写っていない範囲を生成する

360度パノラマを作るには、元の写真に写っていない範囲、たとえばカメラの背後にあたる景色まで生成する必要があります。これは制作工程の中でも特に難しい部分でした。

撮影場所を正確に特定できなかったため、生成した風景がありきたりに見えないようにしながら、画面全体の一貫性と説得力を保つ必要がありました。

まずFigmaでキャンバスを2:1のアスペクト比に調整し、その後AIを使って欠けている範囲を生成しました。

以下は、実際に使用したプロンプトの一例です。

```
Expand the supplied image into a complete, photorealistic 360° equirectangular panorama with an exact 2:1 aspect ratio.

Use the original image as the centered, forward-facing view and the visual source of truth. Preserve the same fixed camera position, horizon height, perspective, scale, lighting, colors, textures, grain, and style. Reconstruct the unseen surroundings conservatively as one continuous version of the same location. Do not frame, mirror, duplicate, restyle, or place the source inside another scene.

Treat the canvas as a horizontally wrapped cylinder. The far-left and far-right edges represent the same rear-facing meridian and must join exactly when placed side by side. Continue every feature crossing one edge immediately through the opposite edge at the same height, scale, depth, color, and lighting. No visible seams, tonal shifts, repeated landmarks, abrupt gaps, or cut-off objects.

Complete the view above and below through the zenith and nadir. Keep the horizon level and blend all expansion boundaries seamlessly. The final image must function as a seamless 360° × 180° environment map, not merely an extra-wide photograph.
```

生成したい風景は元写真ごとに異なるため、プロンプトは写真に合わせて調整しました。

![360度パノラマ用の平面画像](../../../assets/images/blog/03-Panorama/panorama.jpg)
*360度パノラマビューア用に制作した2:1の正距円筒図法画像。*

### krpanoを使った360度パノラマビューアの開発

Figmaでパノラマ画像を生成した後、Codexを活用しながらWebアプリケーションを短期間で開発しました。

正しい形式の画像を読み込ませることで、問題なく360度パノラマを表示できます。

### 古写真らしい雰囲気を強調する

しかし、元の写真をパノラマに変換するだけではなく、体験をより魅力的で印象に残るものにするよう上司からアドバイスを受けました。写真をカラー化する案もありましたが、それでは歴史的な雰囲気や、100年前の白黒写真が持つ独特の魅力が薄れてしまいます。

そこで、古い肖像写真に見られるような傷、ほこり、白い縁などを加える案が出ました。これらの効果をパノラマに適用できる機能を開発しました。

![エフェクトを調整する操作画面](../../../assets/images/blog/03-Panorama/effect-control-ui.webp)
*写真にフレームや視覚効果を加え、好みに合わせて演出を調整できるUIを追加しました。*

### 技術による革新と歴史的な正確さの両立

新しい技術によって没入感のある体験を作れるようになった一方で、正確性を高め、元の資料を尊重して扱うためには、まだ改善の余地があります。

クライアントにプロジェクトを紹介したところ、複数の方から好意的な反応をいただきました。同時に、生成画像の一部を削除したり修正したりするべきだという意見もありました。こうした箇所は、クライアントが持つ固有の歴史的・文脈的な知識がなければ、デザイナーや開発者だけでは判断できないものでした。

この経験から、AIを使いこなすだけでは十分ではないと学びました。デザインや開発のプロセスを通して、クライアントや関係者との協働を大切にし、フィードバックを取り入れることも必要だと考えています。

### 参考リンク

<ul>
  <li>
    <a href="https://panorama-viewer-v3-0.vercel.app/" target="_blank" rel="noopener noreferrer">
      私が制作した360度パノラマビューア
    </a>
  </li>
  <li>
    <a href="https://krpano.com/home/" target="_blank" rel="noopener noreferrer">
      krpano
    </a>
  </li>
</ul>
