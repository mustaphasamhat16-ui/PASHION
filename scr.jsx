import { useState } from "react";

// â”€â”€â”€ SEED DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SEED_POSTS = [
  {
    id: 1,
    userId: "sofia_m",
    userName: "Sofia M.",
    userAvatar: "ðŸ§–â€â™€ï¸",
    userBio: "Minimalist vibes only âœ¦",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
    caption: "Monday fit â€” clean lines, no drama ðŸ¤",
    likes: 284,
    liked: false,
    tags: ["#minimal", "#ootd", "#zara"],
    items: [
      { name: "Linen Oversized Blazer", store: "Zara", price: "89â‚¬", link: "#", emoji: "ðŸ§¥" },
      { name: "Wide Leg Trousers", store: "H&M", price: "34â‚¬", link: "#", emoji: "ðŸ‘–" },
      { name: "Leather Mule", store: "ASOS", price: "55â‚¬", link: "#", emoji: "ðŸ‘ " },
    ],
  },
  {
    id: 2,
    userId: "nina_k",
    userName: "Nina K.",
    userAvatar: "ðŸ’â€â™€ï¸",
    userBio: "Street style forever ðŸ–¤",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
    caption: "Cargo season never ends ðŸ–¤",
    likes: 512,
    liked: false,
    tags: ["#streetwear", "#urban", "#pullandbear"],
    items: [
      { name: "Graphic Crop Hoodie", store: "ASOS", price: "42â‚¬", link: "#", emoji: "ðŸ‘•" },
      { name: "Cargo Pants", store: "Pull&Bear", price: "38â‚¬", link: "#", emoji: "ðŸ‘–" },
      { name: "Platform Sneakers", store: "Zalando", price: "75â‚¬", link: "#", emoji: "ðŸ‘Ÿ" },
      { name: "Chain Crossbody Bag", store: "Zara", price: "29â‚¬", link: "#", emoji: "ðŸ‘œ" },
    ],
  },
  {
    id: 3,
    userId: "lea_b",
    userName: "Lea B.",
    userAvatar: "ðŸŒ¸",
    userBio: "Boho soul ðŸŒ¿",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80",
    caption: "Summer breeze in this wrap dress ðŸŒ¿",
    likes: 198,
    liked: false,
    tags: ["#boho", "#cottagecore", "#summerstyle"],
    items: [
      { name: "Floral Wrap Dress", store: "& Other Stories", price: "95â‚¬", link: "#", emoji: "ðŸ‘—" },
      { name: "Raffia Hat", store: "H&M", price: "22â‚¬", link: "#", emoji: "ðŸ‘’" },
      { name: "Leather Sandals", store: "Mango", price: "65â‚¬", link: "#", emoji: "ðŸ‘¡" },
    ],
  },
];

const STORES = ["Zara", "H&M", "ASOS", "Mango", "Pull&Bear", "Zalando", "& Other Stories", "Andere"];
const EMOJIS = ["ðŸ‘—","ðŸ‘–","ðŸ‘•","ðŸ§¥","ðŸ‘ ","ðŸ‘Ÿ","ðŸ‘¡","ðŸ‘œ","ðŸŽ©","ðŸ‘’","ðŸ’","ðŸ§£"];

// â”€â”€â”€ HELPERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Avatar = ({ emoji, size = 40, ring = false }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: "linear-gradient(135deg, #f5e6d3, #e8c9a0)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.45,
    border: ring ? "2.5px solid #1a1a1a" : "none",
    flexShrink: 0,
  }}>{emoji}</div>
);

// â”€â”€â”€ MAIN APP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function App() {
  const [screen, setScreen] = useState("onboarding"); // onboarding | feed | profile | post | explore
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(SEED_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);
  const [profileView, setProfileView] = useState(null); // userId

  // Onboarding form
  const [form, setForm] = useState({ name: "", username: "", bio: "", avatar: "ðŸ˜Š" });

  const handleRegister = () => {
    if (!form.name || !form.username) return;
    setCurrentUser({ ...form, userId: form.username, posts: [] });
    setScreen("feed");
  };

  const myPosts = posts.filter(p => p.userId === currentUser?.userId);

  const goProfile = (userId) => {
    setProfileView(userId);
    setScreen("profile");
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setScreen("detail");
  };

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#0D0D0D",
      minHeight: "100vh",
      maxWidth: 430,
      margin: "0 auto",
      color: "#F0EDE8",
      position: "relative",
      overflow: "hidden",
    }}>

      {screen === "onboarding" && <Onboarding form={form} setForm={setForm} onRegister={handleRegister} />}
      {screen === "feed" && <Feed posts={posts} currentUser={currentUser} setPosts={setPosts} onLike={toggleLike} onProfile={goProfile} onPost={openPost} onNav={setScreen} />}
      {screen === "explore" && <Explore posts={posts} onLike={toggleLike} onProfile={goProfile} onPost={openPost} onNav={setScreen} />}
      {screen === "post" && <PostCreator currentUser={currentUser} onPublish={(p) => { setPosts(prev => [p, ...prev]); setScreen("feed"); }} onNav={setScreen} />}
      {screen === "detail" && selectedPost && <PostDetail post={posts.find(p => p.id === selectedPost.id) || selectedPost} onLike={toggleLike} onProfile={goProfile} onBack={() => setScreen("feed")} />}
      {screen === "profile" && <ProfileScreen userId={profileView} posts={posts} currentUser={currentUser} onPost={openPost} onBack={() => setScreen("feed")} onNav={setScreen} />}
      {screen === "myprofile" && <ProfileScreen userId={currentUser?.userId} posts={posts} currentUser={currentUser} onPost={openPost} onBack={() => setScreen("feed")} onNav={setScreen} isOwn />}

      {/* Bottom Nav */}
      {["feed","explore","post","myprofile"].includes(screen) && (
        <BottomNav active={screen} onNav={setScreen} />
      )}

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(1.3)} 100%{transform:scale(1)} }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        input, textarea { -webkit-appearance: none; }
      `}</style>
    </div>
  );
}

// â”€â”€â”€ ONBOARDING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Onboarding({ form, setForm, onRegister }) {
  const avatarOptions = ["ðŸ˜Š","ðŸ§–â€â™€ï¸","ðŸ’â€â™€ï¸","ðŸŒ¸","ðŸ¦‹","âœ¨","ðŸŽ€","ðŸŒ¿","ðŸ’«","ðŸ”¥","ðŸŽ­","ðŸ‘‘"];
  const [step, setStep] = useState(0);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 28px" }}>
      {/* Brand */}
      <div style={{ marginBottom: 48, animation: "fadeUp 0.5s ease" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: "#888", marginBottom: 8 }}>WELCOME TO</div>
        <div style={{ fontSize: 42, fontWeight: 400, letterSpacing: -1, lineHeight: 1 }}>WORE</div>
        <div style={{ fontSize: 13, color: "#666", marginTop: 8, fontFamily: "sans-serif" }}>Wear it. Post it. Shop it.</div>
      </div>

      {step === 0 && (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 3, marginBottom: 20, fontFamily: "sans-serif" }}>DEIN AVATAR</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {avatarOptions.map(a => (
              <button key={a} onClick={() => setForm(f => ({ ...f, avatar: a }))} style={{
                width: 52, height: 52, borderRadius: "50%",
                background: form.avatar === a ? "#F0EDE8" : "#1A1A1A",
                border: form.avatar === a ? "none" : "1px solid #2A2A2A",
                fontSize: 24, cursor: "pointer", transition: "all 0.15s",
              }}>{a}</button>
            ))}
          </div>
          <Btn label="WEITER â†’" onClick={() => setStep(1)} />
        </div>
      )}

      {step === 1 && (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 3, marginBottom: 20, fontFamily: "sans-serif" }}>DEIN PROFIL</div>
          <Input label="Name" value={form.name} onChange={v => setForm(f => ({...f, name: v}))} placeholder="z.B. Sofia M." />
          <Input label="Username" value={form.username} onChange={v => setForm(f => ({...f, username: v.replace(/\s/g,"_").toLowerCase()}))} placeholder="z.B. sofia_m" />
          <Input label="Bio" value={form.bio} onChange={v => setForm(f => ({...f, bio: v}))} placeholder="Dein Style in einem Satz..." />
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={() => setStep(0)} style={{ flex: 1, padding: "14px", background: "none", border: "1px solid #2A2A2A", borderRadius: 12, color: "#888", fontFamily: "sans-serif", fontSize: 11, letterSpacing: 2, cursor: "pointer" }}>â† ZURÃœCK</button>
            <button onClick={onRegister} disabled={!form.name || !form.username} style={{
              flex: 2, padding: "14px",
              background: form.name && form.username ? "#F0EDE8" : "#1A1A1A",
              color: form.name && form.username ? "#0D0D0D" : "#444",
              border: "none", borderRadius: 12,
              fontFamily: "sans-serif", fontSize: 11, letterSpacing: 2,
              cursor: form.name && form.username ? "pointer" : "default", transition: "all 0.2s",
            }}>LOSLEGEN âœ¦</button>
          </div>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ FEED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Feed({ posts, currentUser, onLike, onProfile, onPost, onNav }) {
  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: "44px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 5, color: "#555", fontFamily: "sans-serif" }}>YOUR FEED</div>
          <div style={{ fontSize: 28, letterSpacing: -0.5 }}>WORE</div>
        </div>
        <Avatar emoji={currentUser?.avatar} size={38} ring />
      </div>

      {/* Stories Row */}
      <div style={{ display: "flex", gap: 12, padding: "8px 20px 16px", overflowX: "auto" }}>
        {[currentUser, ...posts.map(p => ({ avatar: p.userAvatar, userName: p.userName, userId: p.userId }))
          .filter((v,i,a) => a.findIndex(x=>x.userId===v.userId)===i)].map((u, i) => u && (
          <div key={i} onClick={() => i === 0 ? onNav("myprofile") : onProfile(u.userId)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", flexShrink: 0 }}>
            <div style={{
              padding: 2, borderRadius: "50%",
              background: i === 0 ? "none" : "linear-gradient(135deg, #f5c842, #e8507a)",
            }}>
              <Avatar emoji={u.avatar} size={48} />
            </div>
            <div style={{ fontSize: 9, color: "#666", fontFamily: "sans-serif", letterSpacing: 0.5, maxWidth: 56, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {i === 0 ? "Du" : u.userName?.split(" ")[0]}
            </div>
          </div>
        ))}
      </div>

      {/* Posts */}
      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} index={i} onLike={onLike} onProfile={onProfile} onOpen={() => onPost(post)} />
      ))}
    </div>
  );
}

// â”€â”€â”€ POST CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function PostCard({ post, index, onLike, onProfile, onOpen }) {
  const [showShop, setShowShop] = useState(false);
  const total = post.items.reduce((s, i) => s + parseInt(i.price), 0);

  return (
    <div style={{ marginBottom: 2, animation: `fadeUp 0.4s ease ${index * 0.08}s both` }}>
      {/* Creator row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px" }}>
        <div onClick={() => onProfile(post.userId)} style={{ cursor: "pointer" }}>
          <Avatar emoji={post.userAvatar} size={34} />
        </div>
        <div style={{ flex: 1 }}>
          <div onClick={() => onProfile(post.userId)} style={{ fontSize: 13, cursor: "pointer" }}>{post.userName}</div>
          <div style={{ fontSize: 10, color: "#555", fontFamily: "sans-serif" }}>{post.tags[0]}</div>
        </div>
        <button onClick={() => setShowShop(s => !s)} style={{
          background: showShop ? "#F0EDE8" : "#1A1A1A",
          color: showShop ? "#0D0D0D" : "#F0EDE8",
          border: "1px solid #2A2A2A",
          borderRadius: 20, padding: "5px 12px",
          fontSize: 9, fontFamily: "sans-serif", letterSpacing: 1.5,
          cursor: "pointer", transition: "all 0.2s",
        }}>
          {showShop ? "âœ• CLOSE" : `SHOP Â· ${total}â‚¬`}
        </button>
      </div>

      {/* Image */}
      <div onClick={onOpen} style={{ cursor: "pointer", position: "relative" }}>
        <img src={post.image} alt="" style={{
          width: "100%", aspectRatio: "4/5", objectFit: "cover",
          display: "block",
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(transparent, rgba(13,13,13,0.8))",
        }} />
        <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
          <div style={{ fontSize: 13, lineHeight: 1.4 }}>{post.caption}</div>
        </div>
      </div>

      {/* Shop drawer */}
      {showShop && (
        <div style={{ background: "#111", padding: "12px 16px", animation: "fadeUp 0.2s ease" }}>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: 3, fontFamily: "sans-serif", marginBottom: 10 }}>
            OUTFIT VON {post.userName.toUpperCase()} Â· {post.items.length} TEILE
          </div>
          {post.items.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid #1A1A1A",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 20 }}>{item.emoji}</div>
                <div>
                  <div style={{ fontSize: 12 }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#666", fontFamily: "sans-serif" }}>{item.store}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 12, fontFamily: "sans-serif" }}>{item.price}</div>
                <a href={item.link} style={{
                  background: "#F0EDE8", color: "#0D0D0D",
                  borderRadius: 8, padding: "4px 10px",
                  fontSize: 9, fontFamily: "sans-serif", letterSpacing: 1.5,
                  textDecoration: "none", display: "block",
                }}>KAUFEN</a>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12 }}>
            <div style={{ fontSize: 11, color: "#888", fontFamily: "sans-serif" }}>Gesamt</div>
            <div style={{ fontSize: 16 }}>{total}â‚¬</div>
          </div>
          <button style={{
            width: "100%", marginTop: 12, padding: "13px",
            background: "#F0EDE8", color: "#0D0D0D",
            border: "none", borderRadius: 10,
            fontSize: 10, fontFamily: "sans-serif", letterSpacing: 2,
            cursor: "pointer",
          }}>ALLES KAUFEN Â· {total}â‚¬</button>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 16px" }}>
        <button onClick={() => onLike(post.id)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center", gap: 6,
          color: post.liked ? "#e8507a" : "#666",
          animation: post.liked ? "pop 0.3s ease" : "none",
          transition: "color 0.2s",
        }}>
          <span style={{ fontSize: 18 }}>{post.liked ? "â™¥" : "â™¡"}</span>
          <span style={{ fontSize: 11, fontFamily: "sans-serif" }}>{post.likes}</span>
        </button>
        <button onClick={onOpen} style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 18, padding: 0 }}>ðŸ’¬</button>
      </div>
    </div>
  );
}

// â”€â”€â”€ POST DETAIL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function PostDetail({ post, onLike, onProfile, onBack }) {
  const total = post.items.reduce((s, i) => s + parseInt(i.price), 0);
  return (
    <div style={{ paddingBottom: 40, animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "44px 16px 12px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#888", fontSize: 20, cursor: "pointer", padding: 0 }}>â†</button>
        <div onClick={() => onProfile(post.userId)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <Avatar emoji={post.userAvatar} size={36} />
          <div>
            <div style={{ fontSize: 13 }}>{post.userName}</div>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "sans-serif" }}>@{post.userId}</div>
          </div>
        </div>
      </div>

      <img src={post.image} alt="" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover" }} />

      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {post.tags.map(t => (
            <span key={t} style={{ fontSize: 11, color: "#888", fontFamily: "sans-serif" }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 20 }}>{post.caption}</div>

        <div style={{ fontSize: 9, color: "#555", letterSpacing: 3, fontFamily: "sans-serif", marginBottom: 14 }}>
          DAS TRÃ„GT {post.userName.toUpperCase()}
        </div>

        {post.items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px", background: "#111", borderRadius: 14, marginBottom: 8,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 24 }}>{item.emoji}</div>
              <div>
                <div style={{ fontSize: 13 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: "#666", fontFamily: "sans-serif" }}>{item.store}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 13, fontFamily: "sans-serif" }}>{item.price}</div>
              <a href={item.link} style={{
                background: "#F0EDE8", color: "#0D0D0D",
                borderRadius: 8, padding: "6px 12px",
                fontSize: 9, fontFamily: "sans-serif", letterSpacing: 1.5,
                textDecoration: "none",
              }}>KAUFEN</a>
            </div>
          </div>
        ))}

        <button style={{
          width: "100%", marginTop: 8, padding: "15px",
          background: "#F0EDE8", color: "#0D0D0D",
          border: "none", borderRadius: 12,
          fontSize: 10, fontFamily: "sans-serif", letterSpacing: 2,
          cursor: "pointer",
        }}>
          GANZEN LOOK KAUFEN Â· {total}â‚¬
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
          <button onClick={() => onLike(post.id)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", gap: 8,
            color: post.liked ? "#e8507a" : "#555",
          }}>
            <span style={{ fontSize: 22 }}>{post.liked ? "â™¥" : "â™¡"}</span>
            <span style={{ fontSize: 13, fontFamily: "sans-serif" }}>{post.likes} Likes</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ EXPLORE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Explore({ posts, onLike, onProfile, onPost, onNav }) {
  const [search, setSearch] = useState("");
  const filtered = posts.filter(p =>
    p.userName.toLowerCase().includes(search.toLowerCase()) ||
    p.caption.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "44px 16px 16px" }}>
        <div style={{ fontSize: 9, color: "#555", letterSpacing: 4, fontFamily: "sans-serif", marginBottom: 4 }}>ENTDECKEN</div>
        <div style={{ fontSize: 26, marginBottom: 16 }}>Explore</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "#111", borderRadius: 12, padding: "10px 14px",
        }}>
          <span style={{ color: "#555" }}>ðŸ”</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Style, Creator, Tag..."
            style={{
              background: "none", border: "none", outline: "none",
              color: "#F0EDE8", fontFamily: "sans-serif", fontSize: 13, flex: 1,
            }} />
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: "0 2px" }}>
        {filtered.map(post => (
          <div key={post.id} onClick={() => onPost(post)} style={{ cursor: "pointer", position: "relative" }}>
            <img src={post.image} alt="" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(13,13,13,0.9))",
              padding: "20px 8px 8px",
            }}>
              <div style={{ fontSize: 9, fontFamily: "sans-serif", color: "#ddd" }}>{post.userName}</div>
              <div style={{ fontSize: 9, fontFamily: "sans-serif", color: "#888" }}>
                {post.items.reduce((s, i) => s + parseInt(i.price), 0)}â‚¬ Â· {post.items.length} Teile
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ POST CREATOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function PostCreator({ currentUser, onPublish, onNav }) {
  const [step, setStep] = useState(0);
  const [caption, setCaption] = useState("");
  const [items, setItems] = useState([{ name: "", store: STORES[0], price: "", emoji: "ðŸ‘—", link: "#" }]);
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");

  const addItem = () => setItems(i => [...i, { name: "", store: STORES[0], price: "", emoji: "ðŸ‘—", link: "#" }]);
  const removeItem = (idx) => setItems(i => i.filter((_, j) => j !== idx));
  const updateItem = (idx, key, val) => setItems(i => i.map((item, j) => j === idx ? { ...item, [key]: val } : item));

  const publish = () => {
    const newPost = {
      id: Date.now(),
      userId: currentUser.userId,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      image: imgUrl || "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
      caption,
      likes: 0, liked: false,
      tags: tags.split(" ").filter(Boolean).map(t => t.startsWith("#") ? t : `#${t}`),
      items: items.filter(i => i.name),
    };
    onPublish(newPost);
  };

  return (
    <div style={{ paddingBottom: 40, animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "44px 16px 20px" }}>
        <button onClick={() => onNav("feed")} style={{ background: "none", border: "none", color: "#888", fontSize: 20, cursor: "pointer", padding: 0 }}>âœ•</button>
        <div>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: 3, fontFamily: "sans-serif" }}>NEUER POST</div>
          <div style={{ fontSize: 20 }}>Dein Outfit</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", gap: 4, padding: "0 16px 20px" }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            flex: 1, height: 2,
            background: i <= step ? "#F0EDE8" : "#1A1A1A",
            borderRadius: 2, transition: "background 0.3s",
          }} />
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>

        {step === 0 && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ fontSize: 9, color: "#555", letterSpacing: 3, fontFamily: "sans-serif", marginBottom: 16 }}>SCHRITT 1 Â· FOTO</div>
            <Input label="Foto URL" value={imgUrl} onChange={setImgUrl} placeholder="https://... (oder leer lassen)" />
            {imgUrl && <img src={imgUrl} alt="" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 16, marginBottom: 16 }} />}
            {!imgUrl && (
              <div style={{ background: "#111", borderRadius: 16, aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 40 }}>ðŸ“¸</div>
                <div style={{ fontSize: 10, color: "#555", fontFamily: "sans-serif" }}>Foto URL eingeben</div>
              </div>
            )}
            <Btn label="WEITER â†’" onClick={() => setStep(1)} />
          </div>
        )}

        {step === 1 && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ fontSize: 9, color: "#555", letterSpacing: 3, fontFamily: "sans-serif", marginBottom: 16 }}>SCHRITT 2 Â· OUTFIT TEILE</div>
            {items.map((item, idx) => (
              <div key={idx} style={{ background: "#111", borderRadius: 16, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "#888", fontFamily: "sans-serif" }}>TEIL {idx + 1}</div>
                  {idx > 0 && <button onClick={() => removeItem(idx)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 14 }}>âœ•</button>}
                </div>
                {/* Emoji picker */}
                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  {EMOJIS.map(e => (
                    <button key={e} onClick={() => updateItem(idx, "emoji", e)} style={{
                      background: item.emoji === e ? "#F0EDE8" : "#1A1A1A",
                      border: "none", borderRadius: 8, width: 32, height: 32,
                      fontSize: 16, cursor: "pointer",
                    }}>{e}</button>
                  ))}
                </div>
                <Input label="Produktname" value={item.name} onChange={v => updateItem(idx, "name", v)} placeholder="z.B. Linen Blazer" />
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 2 }}>
                    <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, fontFamily: "sans-serif", marginBottom: 6 }}>STORE</div>
                    <select value={item.store} onChange={e => updateItem(idx, "store", e.target.value)} style={{
                      width: "100%", background: "#0D0D0D", color: "#F0EDE8",
                      border: "1px solid #222", borderRadius: 10, padding: "10px 12px",
                      fontFamily: "sans-serif", fontSize: 12, marginBottom: 10,
                    }}>
                      {STORES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Input label="Preis (â‚¬)" value={item.price} onChange={v => updateItem(idx, "price", v)} placeholder="59" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addItem} style={{
              width: "100%", padding: "12px", background: "none",
              border: "1px dashed #2A2A2A", borderRadius: 12, color: "#555",
              fontFamily: "sans-serif", fontSize: 10, letterSpacing: 2, cursor: "pointer", marginBottom: 16,
            }}>+ TEIL HINZUFÃœGEN</button>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(0)} style={{ flex: 1, padding: "13px", background: "none", border: "1px solid #1A1A1A", borderRadius: 12, color: "#888", fontFamily: "sans-serif", fontSize: 10, letterSpacing: 2, cursor: "pointer" }}>â†</button>
              <button onClick={() => setStep(2)} style={{ flex: 2, padding: "13px", background: "#F0EDE8", color: "#0D0D0D", border: "none", borderRadius: 12, fontFamily: "sans-serif", fontSize: 10, letterSpacing: 2, cursor: "pointer" }}>WEITER â†’</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ fontSize: 9, color: "#555", letterSpacing: 3, fontFamily: "sans-serif", marginBottom: 16 }}>SCHRITT 3 Â· CAPTION & TAGS</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, fontFamily: "sans-serif", marginBottom: 6 }}>CAPTION</div>
              <textarea value={caption} onChange={e => setCaption(e.target.value)}
                placeholder="Beschreibe deinen Look..."
                rows={3}
                style={{
                  width: "100%", background: "#111", border: "1px solid #1A1A1A",
                  borderRadius: 12, padding: "12px 14px",
                  color: "#F0EDE8", fontFamily: "Georgia, serif", fontSize: 14,
                  resize: "none", outline: "none",
                }} />
            </div>
            <Input label="Tags (mit Leerzeichen trennen)" value={tags} onChange={setTags} placeholder="#ootd #minimal #zara" />

            {/* Preview summary */}
            <div style={{ background: "#111", borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, fontFamily: "sans-serif", marginBottom: 8 }}>ZUSAMMENFASSUNG</div>
              <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif" }}>
                {items.filter(i=>i.name).length} Teile Â· {items.filter(i=>i.name).reduce((s,i)=>s+parseInt(i.price||0),0)}â‚¬ gesamt
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", background: "none", border: "1px solid #1A1A1A", borderRadius: 12, color: "#888", fontFamily: "sans-serif", fontSize: 10, letterSpacing: 2, cursor: "pointer" }}>â†</button>
              <button onClick={publish} style={{ flex: 2, padding: "13px", background: "#F0EDE8", color: "#0D0D0D", border: "none", borderRadius: 12, fontFamily: "sans-serif", fontSize: 10, letterSpacing: 2, cursor: "pointer" }}>POSTEN âœ¦</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// â”€â”€â”€ PROFILE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProfileScreen({ userId, posts, currentUser, onPost, onBack, onNav, isOwn }) {
  const userPosts = posts.filter(p => p.userId === userId);
  const user = isOwn ? currentUser : {
    name: userPosts[0]?.userName || userId,
    avatar: userPosts[0]?.userAvatar || "ðŸ˜Š",
    userId,
    bio: "Fashion lover âœ¨",
  };
  const totalLikes = userPosts.reduce((s, p) => s + p.likes, 0);

  return (
    <div style={{ paddingBottom: 100, animation: "fadeIn 0.3s ease" }}>
      <div style={{ padding: "44px 16px 0" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#888", fontSize: 20, cursor: "pointer", padding: 0, marginBottom: 20 }}>â†</button>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
          <Avatar emoji={user?.avatar} size={72} ring={isOwn} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20 }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: "#666", fontFamily: "sans-serif", marginBottom: 8 }}>@{user?.userId}</div>
            <div style={{ fontSize: 12, color: "#999", lineHeight: 1.4 }}>{user?.bio || "Fashion lover âœ¨"}</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, background: "#111", borderRadius: 16, padding: "16px 0", marginBottom: 20 }}>
          {[
            { label: "POSTS", val: userPosts.length },
            { label: "LIKES", val: totalLikes },
            { label: "TEILE", val: userPosts.reduce((s, p) => s + p.items.length, 0) },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? "1px solid #1A1A1A" : "none" }}>
              <div style={{ fontSize: 22 }}>{s.val}</div>
              <div style={{ fontSize: 8, color: "#555", letterSpacing: 2, fontFamily: "sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {isOwn && (
          <button onClick={() => onNav("post")} style={{
            width: "100%", padding: "13px", background: "#1A1A1A",
            border: "1px solid #2A2A2A", borderRadius: 12, color: "#F0EDE8",
            fontFamily: "sans-serif", fontSize: 10, letterSpacing: 2, cursor: "pointer", marginBottom: 20,
          }}>+ OUTFIT POSTEN</button>
        )}

        <div style={{ fontSize: 9, color: "#555", letterSpacing: 3, fontFamily: "sans-serif", marginBottom: 12 }}>OUTFITS</div>
      </div>

      {userPosts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#444" }}>
          <div style={{ fontSize: 32 }}>ðŸ‘—</div>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, marginTop: 8, letterSpacing: 1 }}>Noch keine Posts</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: "0 2px" }}>
          {userPosts.map(post => (
            <div key={post.id} onClick={() => onPost(post)} style={{ cursor: "pointer", position: "relative" }}>
              <img src={post.image} alt="" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(13,13,13,0.85))",
                padding: "20px 8px 8px",
              }}>
                <div style={{ fontSize: 9, fontFamily: "sans-serif", color: "#ddd" }}>
                  {post.items.reduce((s, i) => s + parseInt(i.price), 0)}â‚¬
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ BOTTOM NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BottomNav({ active, onNav }) {
  const tabs = [
    { id: "feed", icon: "âŒ‚", label: "HOME" },
    { id: "explore", icon: "â—Ž", label: "EXPLORE" },
    { id: "post", icon: "âœ¦", label: "POST", special: true },
    { id: "myprofile", icon: "â—‰", label: "PROFIL" },
  ];
  return (
    <div style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 430,
      background: "rgba(13,13,13,0.95)", backdropFilter: "blur(16px)",
      borderTop: "1px solid #1A1A1A",
      display: "flex", zIndex: 50,
    }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onNav(tab.id)} style={{
          flex: 1, padding: "12px 0 16px",
          background: "none", border: "none", cursor: "pointer",
          color: active === tab.id ? "#F0EDE8" : "#444",
          transition: "color 0.2s",
        }}>
          {tab.special ? (
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: active === "post" ? "#F0EDE8" : "#1A1A1A",
              border: "1px solid #2A2A2A",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 2px",
              color: active === "post" ? "#0D0D0D" : "#F0EDE8",
              fontSize: 18, transition: "all 0.2s",
            }}>{tab.icon}</div>
          ) : (
            <div style={{ fontSize: 18, marginBottom: 2 }}>{tab.icon}</div>
          )}
          <div style={{ fontSize: 7, letterSpacing: 1.5, fontFamily: "sans-serif" }}>{tab.label}</div>
        </button>
      ))}
    </div>
  );
}

// â”€â”€â”€ SHARED COMPONENTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Input({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, fontFamily: "sans-serif", marginBottom: 6 }}>{label.toUpperCase()}</div>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", background: "#111", border: "1px solid #1A1A1A",
          borderRadius: 10, padding: "11px 14px",
          color: "#F0EDE8", fontFamily: "Georgia, serif", fontSize: 14, outline: "none",
        }} />
    </div>
  );
}

function Btn({ label, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "14px",
      background: disabled ? "#1A1A1A" : "#F0EDE8",
      color: disabled ? "#444" : "#0D0D0D",
      border: "none", borderRadius: 12,
      fontFamily: "sans-serif", fontSize: 11, letterSpacing: 2,
      cursor: disabled ? "default" : "pointer", transition: "all 0.2s",
    }}>{label}</button>
  );
}

