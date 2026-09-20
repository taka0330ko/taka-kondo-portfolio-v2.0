---
locale: "ja"
title: "授業で作ったREST APIをユーザーテスト用に公開した話"
description: "授業で制作したExpressとMySQLのREST APIを、複数サービスの無料枠を組み合わせて公開し、ReactとReact Nativeから利用できる環境を構築しました。"
publishedAt: 2026-09-14
cover: "../../../assets/images/blog/02-Develop-api/thumnail-statick.webp"
coverAlt: ""
coverVideo: "/videos/blog/product-location-api-02-thumbnail.webm"
coverVideoFallback: "/videos/blog/product-location-api-02-thumbnail.mp4"
tags: ["Development","Case Study"]
---

### 無料サービスを組み合わせて、React Nativeアプリ用のREST APIを作った

React NativeとExpoを使って、スーパーマーケットの商品がどの棚にあるかを表示する「Store Map」を制作しました。

Store Map自体の制作背景やデザインプロセスについては、ポートフォリオですでに紹介しています。

![商品位置情報検索アプリ](../../../assets/images/blog/02-Develop-api/store-map-video-poster.webp)

Store Map:
https://www.takanari-kondo.com/store-map



今回は、その画面の裏側にある「商品データをどう保存し、Webとモバイルで共有したのか」について記録として残していきます。

制作にあったて以下のサービスの無料枠を使いました

- Vercel：React管理アプリのホスティング

- Render：Node.js・Expressサーバーのホスティング

- Aiven：MySQLデータベースのホスティング

- Cloudinary：商品画像の保存

- UptimeRobot：APIサーバーの稼働監視


### 授業で制作した商品管理用Reactアプリ

BCITの授業で、Node.jsとExpressを使ったバックエンドと、そのAPIを操作するためのReact管理アプリ「Product Locator」を制作しました。

![](../../../assets/images/blog/02-Develop-api/product-locator-data.webp)

このアプリでは、以下の操作ができます。

- 商品画像・商品名・売り場での位置などの登録
- 登録済みの商品情報の編集
- 商品の削除

管理画面から商品データを直感的に操作できます。例えば、スーパーマーケットで商品の置き場所が変わった場合、管理画面から位置情報を更新できます。

### 作ったRESTful APIをモバイルアプリでも活用できるようにしたい

授業では、商品データの追加・取得・編集・削除ができるRESTful APIを作りました。せっかくバックエンドサーバーを制作したので、授業で作ったReact管理アプリだけでなく、自作のReact Nativeモバイルアプリからもアクセスして活用したいと考えました。

React管理アプリとReact Nativeモバイルアプリが同じAPIにアクセスすることで、共通の商品データを利用できます。管理画面で商品情報や売り場の位置を更新すると、その内容が商品検索モバイルアプリにも反映される仕組みです。

### まずはサーバーを置きたい

普段制作しているフロントエンドアプリはVercelへデプロイしています。しかし今回は、Node.jsとExpressで作ったサーバーを、Reactの管理画面とは独立したバックエンドとして公開したいと考えました。

そこで、Node.jsとExpressをWebサーバーとして動かせるRenderを選びました。Renderでは、ローカルで作ったExpressサーバーの構成を大きく変えずにデプロイし、外部からアクセスできるAPIのURLを取得できます。

これにより、Reactの管理画面とReact Nativeのモバイルアプリの両方から、同じAPIを通して商品データへアクセスできるようになりました。

- Deploy a Node Express App on Render(https://render.com/docs/deploy-node-express-app)

### 24時間稼働させたい。

しかし問題はRenderは一定時間アクセスがないとスリープ状態になっていまいます。
つまりモバイルアプリでデータベースに好きな時にアクセスできないのでユーザーテストの際に最初のAPIリクエストだけ極端に遅くなることが問題でした。
そこで24時間サーバーを監視してくれるサービスUptimeRobotを利用しこれでスリープ状態になるのを防ぐことができます。

最終的にこのプロジェクトは、次の要素で構成されています。
![](../../../assets/images/blog/02-Develop-api/diagram.webp)


商品画像はCloudinaryへ手動でアップロードし、その画像URLを商品データとしてMySQLに保存しています。
Reactの管理アプリとReact NativeのStore Mapは、どちらも同じAPIを使用します。

### 運用し続けることは現実的ではないでしょう。

今回は、複数の無料サービスを組み合わせ、Store Mapを追加費用なしで動かせる環境を構築しました。最低限動くものを作るという目標と、Reactの管理画面で登録した商品を、React Nativeのアプリでも利用できるようにするという過程を通してAPIの勉強にもなった。

一方で、フロントエンド、API、データベース、画像保存、監視を別々のサービスに依存しているため、障害や料金変更、無料枠の終了がアプリ全体に影響する可能性が今後起こるでしょう。サービスが増えるほど管理も複雑になります。

ポートフォリオや試作では無料サービスの組み合わせは有効ですが、継続利用には安定性、保守性、セキュリティ、バックアップ、障害対応も必要です。利用量の増加による停止や想定外の料金にも注意しなければなりません。だからこそSupabaseのようなBackend as a Serviceが主流なのも頷けます。

今回はいろんなサービスに触れてそれらについて学べたことは今後の開発の際に選択肢が増えることが期待できそうです。
