export const postsDataCode =`
  export const posts = [
  {
    img: "https://picsum.photos/200/300",
    imgAlt: "City night view",
    title: "Exploring Vancouver at Night",
    excerpt: "A short walk through downtown Vancouver after sunset. Neon lights and quiet streets.",
    location: "Vancouver, BC",
    date: "2026-02-01",
    url: "https://example.com/article/vancouver-night"
  },
  {
    img: "https://picsum.photos/seed/picsum/200/300",
    imgAlt: "Mountain landscape",
    title: "Weekend Hiking Escape",
    excerpt: "A refreshing hike just outside the city. Perfect for a quick weekend reset.",
    location: "North Vancouver, BC",
    date: "2026-01-28",
    url: "https://example.com/article/hiking-escape"
  },
  {
    img: "https://picsum.photos/200/300?grayscale",
    imgAlt: "Cafe interior",
    title: "Hidden Cafés You Should Know",
    excerpt: "Three small cafés with great coffee and calm vibes for focused work.",
    location: "Burnaby, BC",
    date: "2026-01-20",
    url: "https://example.com/article/hidden-cafes"
  }
];
  },`


export const templateTagCode = `
    <template id="tpl-card">
        <article class="card">
            <figure>
                <img class="tpl-img" src="" alt="">
            </figure>
            <div class="text-container">
                <h3 class="tpl-title"></h3>
                <p class="tpl-excerpt"></p>
            </div>
            <footer>
                <div>
                    <p class="tpl-location"></p>
                    <p class="tpl-date"></p>
                </div>
                <div>
                    <a class="tpl-url" href="">Read</a>
                </div>
            </footer>
        </article>
    </template>
`

export const renderPostCode = `
import {posts} from "/data.js";

posts.forEach(post => {
    const tplCard = document.getElementById("tpl-card");
    const content = tplCard.content.cloneNode(true);

    content.querySelector(".tpl-img").src = post.img;
    content.querySelector(".tpl-img").alt = post.imgAlt;
    content.querySelector(".tpl-title").textContent = post.title;
    content.querySelector(".tpl-excerpt").textContent = post.excerpt;
    content.querySelector(".tpl-location").textContent = post.location;
    content.querySelector(".tpl-date").textContent = post.date;
    content.querySelector(".tpl-url").href = post.url;

    document.body.appendChild(content)
});

`

export const postDataType = `
export type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string | null;
  cover_image_path: string | null;
};
`

export const fetchData = `
export async function getAllPosts(): Promise<PostCard[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, published_at, cover_image_path")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch posts", error);
    return [];
  }

  return data ?? [];
}
`