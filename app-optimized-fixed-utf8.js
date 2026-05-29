
    const storageKey = "team6-ai-navigator-entries-v1";
    const settingsKey = "team6-ai-navigator-settings-v1";
    const genericReplyStart = "受け取りました。少し整理すると";
    const levels = ["Understand", "Compare", "Think", "Create", "Execute"];
    const levelDefinitions = [
      { id: "Understand", name: "理解", description: "背景、意味、前提、基本情報を知り、状況をつかもうとしている問い。" },
      { id: "Compare", name: "比較", description: "複数の選択肢、事例、メリット・デメリットを比べたい問い。" },
      { id: "Think", name: "思考", description: "論点、原因、目的、優先順位を整理し、考えを深めたい問い。" },
      { id: "Create", name: "創造", description: "新しいアイデア、企画、仮説、仕組み、表現を生み出したい問い。" },
      { id: "Execute", name: "実行", description: "具体的な手順、導入、検証、改善、次の行動へ移したい問い。" }
    ];

    const categories = [
      { id: "strategy", name: "事業戦略", definition: "事業の方向性、収益構造、市場での勝ち筋を考える相談。", color: "#18324a", keywords: ["事業", "売上", "市場", "戦略", "経営", "新規", "成長", "競合", "収益", "kpi"] },
      { id: "customer", name: "顧客・マーケ", definition: "顧客理解、営業、集客、ブランド、顧客体験に関する相談。", color: "#2f6f9f", keywords: ["顧客", "営業", "マーケ", "販売", "ブランド", "ユーザー", "ニーズ", "広告", "集客", "購買"] },
      { id: "operations", name: "業務改善", definition: "日々の仕事の進め方、標準化、効率化、運用設計に関する相談。", color: "#18716d", keywords: ["業務", "効率", "改善", "標準化", "プロセス", "運用", "生産性", "手順", "現場", "仕組み"] },
      { id: "team", name: "組織・チーム", definition: "チーム運営、合意形成、人材、文化、マネジメントに関する相談。", color: "#4d7f45", keywords: ["チーム", "組織", "会議", "合意", "メンバー", "上司", "部下", "人材", "文化", "マネジメント"] },
      { id: "ai", name: "AI・技術", definition: "AI、データ、システム、DX、技術活用に関する相談。", color: "#356d9f", keywords: ["ai", "生成ai", "エージェント", "自動化", "データ", "システム", "dx", "ツール", "技術", "分析"] },
      { id: "education", name: "教育・学習", definition: "研修、育成、教材、学び直し、ナレッジ共有に関する相談。", color: "#7a5fb2", keywords: ["教育", "学習", "研修", "育成", "授業", "学校", "教材", "リスキリング", "トレーニング", "ナレッジ"] },
      { id: "career", name: "キャリア", definition: "役割、評価、転職、専門性、将来の働き方に関する相談。", color: "#8a3542", keywords: ["キャリア", "転職", "評価", "役割", "成長", "学び", "スキル", "仕事", "専門性", "将来"] },
      { id: "life", name: "生活・働き方", definition: "時間、家族、生活リズム、働き方、暮らしの整え方に関する相談。", color: "#527448", keywords: ["生活", "家族", "時間", "習慣", "暮らし", "育児", "介護", "住まい", "リズム", "休日", "働き方"] },
      { id: "health", name: "健康・集中", definition: "睡眠、疲れ、集中力、ストレス、メンタルや体調に関する相談。", color: "#bc654d", keywords: ["健康", "睡眠", "運動", "疲れ", "集中", "ストレス", "メンタル", "体調", "休む", "不安"] },
      { id: "money", name: "お金・投資", definition: "予算、費用、収入、投資、家計や資金に関する相談。", color: "#b6812f", keywords: ["お金", "予算", "投資", "費用", "価格", "収入", "家計", "資金", "利益", "コスト"] },
      { id: "creative", name: "創造・企画", definition: "企画、アイデア、表現、資料、発信、コンテンツに関する相談。", color: "#9a5b83", keywords: ["企画", "アイデア", "文章", "デザイン", "発信", "作品", "表現", "資料", "コンテンツ", "クリエイティブ"] }
    ];

    const hotTopics = {
      strategy: ["AI時代の事業ポートフォリオ", "顧客課題起点の新規事業", "価格転嫁と収益性改善"],
      customer: ["AIを使った顧客理解", "BtoBマーケティングの自動化", "顧客体験とパーソナライズ"],
      operations: ["AI時代の業務再設計", "現場業務の標準化と自動化", "ナレッジマネジメントの刷新"],
      team: ["AI導入時のチーム合意形成", "リスキリングと役割再設計", "心理的安全性の実装"],
      ai: ["AIエージェント活用", "社内データとRAG", "生成AIガバナンス"],
      education: ["生成AI時代の教育設計", "企業研修とリスキリング", "個別最適な学習体験"],
      career: ["AI時代のキャリア戦略", "ポートフォリオ型人材", "学び直しと専門性の再編集"],
      life: ["時間管理とデジタルウェルビーイング", "ハイブリッドワークの生活設計", "家族と仕事の両立"],
      health: ["睡眠とパフォーマンス", "メンタルヘルスと職場", "集中力を支える習慣"],
      money: ["家計防衛とインフレ", "AI時代の投資テーマ", "副業と収入ポートフォリオ"],
      creative: ["AIとクリエイティブ制作", "個人発信のブランド化", "プロトタイピング文化"]
    };

    const titles = {
      question: ["さぁ、はじめよう！", "ChatGPTなどの会話履歴を貼り付けると、内容が裏側で分類され、航海図と発見候補に反映されます。"],
      voyage: ["航海に出る", "対話ログをカテゴリと問いのレベルに分け、ヒートマップ上に点として蓄積します。自分の問い合わせの偏りをここで初めて確認できます。"],
      discover: ["発見する", "航海マップのカテゴリごとに、世間一般で話題になりやすいテーマのニュース検索URLを上位3件ずつ提案します。"]
    };

    const state = {
      entries: loadEntries(),
      settings: loadSettings(),
      activeTab: "question"
    };

    const importInput = document.querySelector("#importInput");
    const importForm = document.querySelector("#importForm");
    const importResult = document.querySelector("#importResult");

    bindEvents();
    render();

    function bindEvents() {
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => switchTab(tab.dataset.tab));
      });

      importForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const imported = parseConversation(importInput.value);
        if (!imported.length) {
          importResult.innerHTML = `<strong>取り込める文章が見つかりませんでした</strong><span>ChatGPTなどの会話履歴をコピーして、そのまま貼り付けてください。</span>`;
          importInput.focus();
          return;
        }
        const now = Date.now();
        const entries = imported.map((text, index) => {
          const result = classify(text);
          return {
            id: createId(),
            text,
            reply: "",
            pending: false,
            imported: true,
            category: result.category,
            level: result.level,
            createdAt: new Date(now + index).toISOString()
          };
        });
        state.entries.push(...entries);
        saveEntries();
        render();
        const categoryCount = new Set(entries.map((entry) => normalizeCategoryId(entry.category))).size;
        importResult.innerHTML = `<strong>${entries.length}件の発言を取り込みました</strong><span>${categoryCount}カテゴリに分類し、「航海に出る」と「発見する」へ反映しました。</span>`;
      });

      document.querySelector("#clearImportBtn").addEventListener("click", () => {
        importInput.value = "";
        importResult.innerHTML = `<strong>何でも気軽に貼り付けてね</strong><span>取り込んだ内容は「航海に出る」と「発見する」に反映されます。</span>`;
        importInput.focus();
      });

      document.querySelector("#resetBtn").addEventListener("click", () => {
        if (!state.entries.length) return;
        if (!confirm("今までの問い合わせ内容と航海データをリセットしますか？")) return;
        state.entries = [];
        saveEntries();
        render();
      });

      document.querySelector("#exportBtn").addEventListener("click", exportEntries);
    }

    function syncSettings() {
      state.settings.provider = providerSelect.value;
      state.settings.model = modelInput.value.trim() || defaultModel(providerSelect.value);
      state.settings.apiKey = apiKeyInput.value.trim();
      state.settings.saveKey = saveKeyInput.checked;
      saveSettings();
    }

    function switchTab(id) {
      state.activeTab = id;
      document.querySelectorAll(".tab").forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.tab === id)));
      document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === id));
      document.querySelector("#viewTitle").textContent = titles[id][0];
      document.querySelector("#viewLead").textContent = titles[id][1];
    }

    function classify(text) {
      const normalized = text.toLowerCase();
      const scored = categories.map((category) => {
        let score = 0;
        category.keywords.forEach((keyword) => {
          if (normalized.includes(keyword.toLowerCase())) score += keyword.length >= 3 ? 3 : 2;
        });
        return { category: category.id, score };
      }).sort((a, b) => b.score - a.score);
      return {
        category: scored[0].score ? scored[0].category : "strategy",
        level: estimateLevel(text)
      };
    }

    function parseConversation(rawText) {
      const cleaned = rawText
        .replace(/\r/g, "")
        .replace(/\u00a0/g, " ")
        .trim();
      if (!cleaned) return [];

      const lines = cleaned.split("\n").map((line) => line.trim()).filter(Boolean);
      const userTurns = [];
      let currentSpeaker = "";
      let buffer = [];

      const flush = () => {
        const text = buffer.join("\n").trim();
        if (text && currentSpeaker === "user") userTurns.push(text);
        buffer = [];
      };

      lines.forEach((line) => {
        const userMatch = line.match(/^(user|you|あなた|ユーザー|自分|質問|相談者)(?:\s+said)?\s*(?::|：)?\s*(.*)$/i);
        const assistantMatch = line.match(/^(assistant|chatgpt|claude|gemini|ai|回答|アシスタント)(?:\s+said)?\s*(?::|：)?\s*(.*)$/i);
        if (userMatch) {
          flush();
          currentSpeaker = "user";
          if (userMatch[2]) buffer.push(userMatch[2]);
          return;
        }
        if (assistantMatch) {
          flush();
          currentSpeaker = "assistant";
          if (assistantMatch[2]) buffer.push(assistantMatch[2]);
          return;
        }
        if (currentSpeaker) buffer.push(line);
      });
      flush();

      const candidates = userTurns.length ? userTurns : cleaned.split(/\n{2,}/);
      return candidates
        .map((text) => text.replace(/^(user|you|あなた|ユーザー|自分|質問|相談者)\s*(said|:|：)?\s*/i, "").trim())
        .filter((text) => text.length >= 8)
        .filter((text) => !/^(chatgpt|claude|gemini|assistant|ai|回答|アシスタント)\s*(said|:|：)?/i.test(text))
        .slice(0, 80);
    }

    function estimateLevel(text) {
      const normalized = text.toLowerCase();
      const patterns = [
        { id: "Execute", words: ["実行", "導入", "手順", "進め方", "計画", "ロードマップ", "検証", "改善", "始める", "やり方", "次に", "アクション"] },
        { id: "Create", words: ["作りたい", "考案", "アイデア", "企画", "設計", "仮説", "新しい", "創造", "提案", "仕組み", "案を"] },
        { id: "Think", words: ["考えたい", "整理", "論点", "原因", "目的", "課題", "優先順位", "意思決定", "悩み", "迷って"] },
        { id: "Compare", words: ["比較", "違い", "どちら", "メリット", "デメリット", "選択肢", "事例", "おすすめ", "比べ"] },
        { id: "Understand", words: ["とは", "何", "教えて", "知りたい", "意味", "基本", "概要", "背景", "理解"] }
      ];
      const scored = patterns.map((pattern) => ({
        id: pattern.id,
        score: pattern.words.reduce((sum, word) => sum + (normalized.includes(word.toLowerCase()) ? 1 : 0), 0)
      })).sort((a, b) => b.score - a.score);
      if (scored[0].score) return scored[0].id;
      if (text.length > 150) return "Think";
      if (text.length > 80) return "Understand";
      return "Understand";
    }

    async function createReply(text, history) {
      if (!state.settings.apiKey) {
        return makeReply(text, history);
      }
      try {
        if (state.settings.provider === "openai") return await callOpenAI(text, history);
        if (state.settings.provider === "claude") return await callClaude(text, history);
        if (state.settings.provider === "gemini") return await callGemini(text, history);
        return makeReply(text, history);
      } catch (error) {
        return `選択したAIへの接続でうまく返答を受け取れませんでした。キーやモデル名、ブラウザからの直接アクセス可否を確認してください。\n\nただ、相談自体は続けられます。いまの内容に対しては、まずこう考えるのがよさそうです。\n\n${makeReply(text, history)}`;
      }
    }

    function conversationForApi(text, history) {
      const system = "あなたはTEAM6 - AI時代の航海士です。ユーザーの相談相手として、自然であたたかい日本語で対話してください。分類結果、カテゴリ名、成熟度、ヒートマップの話は回答に出さないでください。ChatGPTやClaudeのように、相手の文脈を受け止め、必要なら短く問い返し、十分な情報があれば具体的な選択肢や次の一歩を提案してください。長すぎる説明は避け、会話が続けやすい余白を残してください。";
      const messages = history.flatMap((entry) => [
        { role: "user", content: entry.text },
        { role: "assistant", content: entry.reply || "" }
      ]);
      messages.push({ role: "user", content: text });
      return { system, messages };
    }

    async function callOpenAI(text, history) {
      const convo = conversationForApi(text, history);
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${state.settings.apiKey}`
        },
        body: JSON.stringify({
          model: state.settings.model || defaultModel("openai"),
          instructions: convo.system,
          input: buildTranscript(convo.messages)
        })
      });
      const data = await parseApiResponse(response);
      return data.output_text || extractOpenAIText(data) || "回答テキストを取得できませんでした。";
    }

    async function callClaude(text, history) {
      const convo = conversationForApi(text, history);
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": state.settings.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: state.settings.model || defaultModel("claude"),
          max_tokens: 1200,
          system: convo.system,
          messages: convo.messages
        })
      });
      const data = await parseApiResponse(response);
      return (data.content || []).filter((item) => item.type === "text").map((item) => item.text).join("\n") || "回答テキストを取得できませんでした。";
    }

    async function callGemini(text, history) {
      const convo = conversationForApi(text, history);
      const model = encodeURIComponent(state.settings.model || defaultModel("gemini"));
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(state.settings.apiKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: convo.system }] },
          contents: convo.messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }]
          }))
        })
      });
      const data = await parseApiResponse(response);
      return (((data.candidates || [])[0] || {}).content || {}).parts?.map((part) => part.text || "").join("\n").trim() || "回答テキストを取得できませんでした。";
    }

    async function parseApiResponse(response) {
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) {
        const message = data.error?.message || data.message || `${response.status} ${response.statusText}`;
        throw new Error(message);
      }
      return data;
    }

    function extractOpenAIText(data) {
      return (data.output || []).flatMap((item) => item.content || []).filter((content) => content.type === "output_text").map((content) => content.text).join("\n").trim();
    }

    function buildTranscript(messages) {
      return messages.map((message) => `${message.role === "assistant" ? "Assistant" : "User"}: ${message.content}`).join("\n\n");
    }

    function makeReply(text, history) {
      const lower = text.toLowerCase();
      const turn = history.length;
      const asksWhat = /とは|って何|何か|なに|what/.test(lower);
      const asksHow = /どう|どのよう|何から|進め|始め|作り方|つくり方|方法|how/.test(lower);
      const asksExample = /例|サンプル|具体/.test(text);
      const hasAI = lower.includes("ai") || text.includes("生成AI") || text.includes("エージェント");
      const hasTeam = /チーム|現場|組織|メンバー|会社|部門/.test(text);
      const hasAnxiety = /不安|迷|悩|困|怖|抵抗/.test(text);

      if (/apiキー|APIキー|トークン|token/i.test(text)) {
        return "APIキーは、あなたがOpenAIやClaude、GeminiなどのAIサービスを使うための「利用者専用の合い鍵」のようなものです。\n\nこの画面では、そのキーを入れると、入力した相談を選択したAIへ送り、あなた自身の利用枠や課金で回答を受け取れます。キーを入れない場合でも簡易的な会話はできますが、本物のAIのような自由な回答にするにはAPIキーが必要です。\n\n共有PCで使う場合は、保存チェックを外しておくのが安全です。";
      }

      if (asksWhat && text.includes("AIエージェント")) {
        return "AIエージェントは、単に質問に答えるだけでなく、目的に向かって手順を考え、必要な情報を集め、作業を進めるAIのことです。\n\n普通のチャットAIが「聞かれたら答える」存在だとすると、AIエージェントは「ゴールを理解して、次に何をすべきかを提案し、場合によっては実行まで助ける」存在です。\n\nこのツールで言えば、あなたとの対話を通じて問いを整理し、その裏側で相談の傾向を記録し、あとから航海図として見えるようにする役割を担っています。";
      }

      if (hasAI && asksHow && /作り方|つくり方|作る|開発/.test(text)) {
        return "AIエージェントを作る時は、いきなり高度な自律実行を目指すより、次の順番で設計すると現実的です。\n\n1. 何を助けるエージェントかを決める\n例：問いを整理する、議事録から論点を出す、顧客対応を下書きする。\n\n2. 入力と出力を決める\nユーザーは何を入れるのか。エージェントは回答、分類、提案、次の質問のどれを返すのか。\n\n3. 記憶する情報を決める\n会話履歴、カテゴリ、重要な決定、未解決の問いなどです。\n\n4. 小さな判断ルールを作る\n最初は完全なAIでなくても、今回のようにカテゴリ分類やレベル判定を裏側で持たせるだけで、かなりエージェントらしくなります。\n\nこのTEAM6なら、次は「さぁ、はじめよう！」での回答品質と、「航海に出る」で見える分析軸を磨くのがよさそうです。";
      }

      if (hasAI && hasTeam) {
        return "チームにAIを入れる話なら、最初に見るべきなのはツール選定よりも「どの業務で、誰の負担を、どのくらい減らしたいか」です。\n\nおすすめは、まず1つの小さな業務を選ぶことです。たとえば、会議メモの整理、資料のたたき台、問い合わせ対応の下書きなど。そこで効果と不安の両方を見ます。\n\n進め方としては、\n1. 試す業務を1つに絞る\n2. 使ってよい情報と使ってはいけない情報を決める\n3. 2週間だけ試す\n4. 時短だけでなく、品質や心理的負担も振り返る\n\nこの順番なら、現場の不安を置き去りにせず始めやすいです。";
      }

      if (hasAnxiety && turn === 0) {
        return "その不安はかなり大事な手がかりです。最初から答えを出そうとせず、まず背景を少し見たいです。\n\n差し支えなければ、次のどれが一番近いか教えてください。\n1. 何から始めればいいか分からない\n2. 関係者をどう巻き込むか悩んでいる\n3. 失敗した時のリスクが気になる\n4. 自分の考えをまだ言語化できていない";
      }

      if (asksHow) {
        return "進め方としては、まず大きなテーマを「次に確認できる問い」まで小さくするのがよさそうです。\n\nたとえば、\n・何が分かれば判断できるのか\n・誰の合意が取れれば前に進むのか\n・1週間で試せる最小の行動は何か\n\nこの3つに分けると、相談がかなり扱いやすくなります。今の話でいうと、まず決めたいのは「方向性」「関係者への説明」「具体的な一歩」のどれに近いですか？";
      }

      if (asksExample) {
        return "具体例で考えると分かりやすいです。\n\nたとえば「AIを使いたい」という相談なら、問いはこう分けられます。\n・何に使うと効果がありそうか\n・誰が使うと一番助かるか\n・どの情報はAIに入れてよいか\n・試した結果を何で判断するか\n\nこのように分けると、ぼんやりした相談が、チームで議論できる問いに変わっていきます。";
      }

      if (turn === 0) {
        return "ありがとうございます。まずは背景を少しだけ知りたいです。\n\nこの相談は、今すぐ決めたい話ですか。それとも、まだ考えを整理している段階ですか？\n\nあわせて、関係している人やチームがいる場合は、誰が影響を受けるのかも教えてください。そこが分かると、次の問いをかなり具体化できます。";
      }

      return "なるほど。ここまでの話を踏まえると、次は少し具体的にできます。\n\nいま考えるべきポイントは、\n1. 何を決めたいのか\n2. 何が分かっていないのか\n3. 次に誰と確認すべきか\nの3つです。\n\nまずは「何を決めたいのか」を一文にしてみましょう。私の方で、その文をチームで使える問いに整えます。";
    }

    function stats() {
      const data = {};
      categories.forEach((category) => {
        data[category.id] = { count: 0, levels: Object.fromEntries(levels.map((level) => [level, 0])) };
      });
      state.entries.forEach((entry) => {
        const categoryId = normalizeCategoryId(entry.category);
        if (!data[categoryId]) return;
        const levelId = normalizeLevelId(entry.level);
        data[categoryId].count += 1;
        data[categoryId].levels[levelId] += 1;
      });
      return data;
    }

    function render() {
      renderImportStatus();
      renderDefinitions();
      renderHeatmap();
      renderLogs();
      renderDiscover();
    }

    function renderDefinitions() {
      document.querySelector("#categoryDefinitions").innerHTML = categories.map((category) => `
        <div class="definitionItem">
          <strong style="color:${category.color}">${category.name}</strong>
          ${category.definition}
        </div>
      `).join("");
      document.querySelector("#levelDefinitions").innerHTML = levelDefinitions.map((level) => `
        <div class="definitionItem">
          <strong>${level.name}</strong>
          ${level.description}
        </div>
      `).join("");
    }

    function renderImportStatus() {
      if (!importResult || state.entries.length) return;
      importResult.innerHTML = `<strong>何でも気軽に貼り付けてね</strong><span>取り込んだ内容は「航海に出る」と「発見する」に反映されます。</span>`;
    }

    function sanitizeReply(reply) {
      return reply
        .replace(/^APIキーが未入力のため、いまはブラウザ内の簡易応答で返します。\n\n/, "")
        .replace(/^AI APIへの接続でエラーが出ました。\n[\s\S]*?参考までに、簡易応答も返します。\n\n/, "");
    }

    function renderHeatmap() {
      const board = document.querySelector("#heatBoard");
      const header = ["カテゴリ", ...levelDefinitions.map((level) => level.name)].map((label) => `<div class="heatCell heatHead">${label}</div>`).join("");
      const rows = categories.map((category) => {
        const cells = [`<div class="heatCell catHead" style="--cat:${category.color}">${category.name}</div>`];
        levels.forEach((level) => {
          const entries = state.entries.filter((entry) => normalizeCategoryId(entry.category) === category.id && normalizeLevelId(entry.level) === level);
          const dots = entries.slice(0, 12).map((entry, index) => {
            const x = 22 + ((index * 23) % 56);
            const y = 24 + ((index * 31) % 46);
            const size = Math.min(28, 10 + entries.length * 2);
            return `<span class="dot" title="${escapeHtml(entry.text)}" style="--cat:${category.color};--x:${x}%;--y:${y}%;--size:${size}px"></span>`;
          }).join("");
          cells.push(`<div class="heatCell ${entries.length ? "active" : ""}">${dots}${entries.length ? `<span class="heatCount">${entries.length}</span>` : ""}</div>`);
        });
        return cells.join("");
      }).join("");
      board.innerHTML = header + rows;
    }

    function renderLogs() {
      const list = document.querySelector("#logList");
      if (!list) return;
      if (!state.entries.length) {
        list.innerHTML = `<div class="empty">まだ相談ログはありません。</div>`;
        return;
      }
      list.innerHTML = state.entries.slice().reverse().map((entry) => {
        const category = categories.find((item) => item.id === normalizeCategoryId(entry.category)) || categories[0];
        return `
          <article class="logItem">
            <div class="logMeta"><strong style="color:${category.color}">${category.name} / ${levelName(entry.level)}</strong><span>${formatDate(entry.createdAt)}</span></div>
            <div>${escapeHtml(entry.text)}</div>
          </article>
        `;
      }).join("");
    }

    function normalizeCategoryId(id) {
      const legacy = { business: "strategy" };
      return legacy[id] || id;
    }

    function normalizeLevelId(id) {
      const legacy = {
        Beginner: "Understand",
        Explorer: "Compare",
        Strategist: "Think",
        Pioneer: "Execute"
      };
      return legacy[id] || id || "Understand";
    }

    function levelName(id) {
      return (levelDefinitions.find((level) => level.id === normalizeLevelId(id)) || levelDefinitions[0]).name;
    }

    function renderDiscover() {
      const data = stats();
      document.querySelector("#discoverList").innerHTML = categories.map((category) => {
        const topics = hotTopics[category.id].slice(0, 3);
        const topicLinks = topics.map((topic, index) => {
          const newsUrl = `https://news.google.com/search?q=${encodeURIComponent(topic)}&hl=ja&gl=JP&ceid=JP:ja`;
          const webUrl = `https://www.google.com/search?q=${encodeURIComponent(topic + " 最新 ニュース")}`;
          return `
            <div>
              <strong>${index + 1}. ${topic}</strong>
              <a href="${newsUrl}" target="_blank" rel="noreferrer">Google Newsで見る</a>
              <a href="${webUrl}" target="_blank" rel="noreferrer">Web検索で見る</a>
            </div>
          `;
        }).join("");
        return `
          <article class="discoverItem">
            <strong style="color:${category.color}">${category.name}</strong>
            <span>この縦軸で視野を広げるための探索候補です。</span>
            ${topicLinks}
          </article>
        `;
      }).join("");
    }

    function exportEntries() {
      const blob = new Blob([JSON.stringify(state.entries, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "team6-ai-navigator-log.json";
      anchor.click();
      URL.revokeObjectURL(url);
    }

    function createId() {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
      return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    function loadEntries() {
      try {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
      } catch {
        return [];
      }
    }

    function saveEntries() {
      localStorage.setItem(storageKey, JSON.stringify(state.entries));
    }

    function loadSettings() {
      try {
        const saved = JSON.parse(localStorage.getItem(settingsKey)) || {};
        const provider = saved.provider || "openai";
        return {
          provider,
          model: saved.model || defaultModel(provider),
          apiKey: saved.saveKey ? saved.apiKey || "" : "",
          saveKey: Boolean(saved.saveKey)
        };
      } catch {
        return { provider: "openai", model: defaultModel("openai"), apiKey: "", saveKey: false };
      }
    }

    function saveSettings() {
      const payload = {
        provider: state.settings.provider,
        model: state.settings.model,
        saveKey: state.settings.saveKey,
        apiKey: state.settings.saveKey ? state.settings.apiKey : ""
      };
      localStorage.setItem(settingsKey, JSON.stringify(payload));
    }

    function defaultModel(provider) {
      if (provider === "claude") return "claude-sonnet-4-5";
      if (provider === "gemini") return "gemini-2.5-flash";
      return "gpt-4.1";
    }

    function formatDate(value) {
      return new Date(value).toLocaleString("ja-JP", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    }

    function escapeHtml(value) {
      return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  