export type Entry = {
  id: string;
  babyWords: string[];
  realWordJa: string;
  displayJa: string;
  imageFile: string;
};

export type Category = {
  id: string;
  nameJa: string;
  emoji: string;
  entries: Entry[];
};

export const VOCABULARY_DATA: Category[] = [
  {
    id: "people",
    nameJa: "人",
    emoji: "👨‍👩‍👧",
    entries: [
      { id: "mother", babyWords: ["まー", "まんま"], realWordJa: "母親", displayJa: "おかあさん", imageFile: "people/people_mother.png" },
      { id: "father", babyWords: ["ぱー", "ぱーぱ"], realWordJa: "父親", displayJa: "おとうさん", imageFile: "people/people_father.png" },
      { id: "grandfather", babyWords: ["じいじ"], realWordJa: "祖父", displayJa: "おじいちゃん", imageFile: "people/people_grandfather.png" },
      { id: "grandmother", babyWords: ["ばあば"], realWordJa: "祖母", displayJa: "おばあちゃん", imageFile: "people/people_grandmother.png" },
      { id: "brother", babyWords: ["にぃに"], realWordJa: "兄", displayJa: "おにいちゃん", imageFile: "people/people_brother.png" },
      { id: "sister", babyWords: ["ねぇね"], realWordJa: "姉", displayJa: "おねえちゃん", imageFile: "people/people_sister.png" },
      { id: "friend", babyWords: ["ともらち"], realWordJa: "友達", displayJa: "おともだち", imageFile: "people/people_friend.png" },
    ],
  },
  {
    id: "animals",
    nameJa: "動物",
    emoji: "🐶",
    entries: [
      { id: "dog", babyWords: ["ワンワン"], realWordJa: "犬", displayJa: "いぬ", imageFile: "animals/animals_dog.png" },
      { id: "cat", babyWords: ["ニャンニャン", "ニャ"], realWordJa: "猫", displayJa: "ねこ", imageFile: "animals/animals_cat.png" },
      { id: "mouse", babyWords: ["チュー", "チューチュー"], realWordJa: "鼠", displayJa: "ねずみ", imageFile: "animals/animals_mouse.png" },
      { id: "cow", babyWords: ["モーモー"], realWordJa: "牛", displayJa: "うし", imageFile: "animals/animals_cow.png" },
      { id: "pigeon", babyWords: ["ポッポ"], realWordJa: "鳩", displayJa: "はと", imageFile: "animals/animals_pigeon.png" },
      { id: "chicken", babyWords: ["コッコさん", "とっと", "コケコッコー"], realWordJa: "鶏", displayJa: "にわとり", imageFile: "animals/animals_chiken.png" },
      { id: "horse", babyWords: ["ンマ", "オンマ"], realWordJa: "馬", displayJa: "うま", imageFile: "animals/animals_horse.png" },
      { id: "bug", babyWords: ["むいむい"], realWordJa: "虫", displayJa: "むし", imageFile: "animals/animals_bug.png" },
      { id: "fish", babyWords: ["おっとっと", "とと"], realWordJa: "魚", displayJa: "さかな", imageFile: "animals/animals_fish.png" },
      { id: "bird", babyWords: ["とっと", "ぴよぴよ"], realWordJa: "鳥", displayJa: "とり", imageFile: "animals/animals_bird.png" },
      { id: "sheep", babyWords: ["めーめー"], realWordJa: "羊", displayJa: "ひつじ", imageFile: "animals/animals_sheep.png" },
      { id: "rabbit", babyWords: ["ぴょんぴょん"], realWordJa: "兎", displayJa: "うさぎ", imageFile: "animals/animals_rabbit.png" },
      { id: "pig", babyWords: ["ブーブー"], realWordJa: "豚", displayJa: "ぶた", imageFile: "animals/animals_pig.png" },
      { id: "lion", babyWords: ["ガオー"], realWordJa: "ライオン", displayJa: "らいおん", imageFile: "animals/animals_lion.png" },
      { id: "duck", babyWords: ["ガーガー"], realWordJa: "家鴨", displayJa: "あひる", imageFile: "animals/animals_duck.png" },
      { id: "frog", babyWords: ["ケロケロ"], realWordJa: "蛙", displayJa: "かえる", imageFile: "animals/animals_frog.png" },
      { id: "cicada", babyWords: ["ミーンミーン"], realWordJa: "蝉", displayJa: "せみ", imageFile: "animals/animals_cicada.png" },
      { id: "elephant", babyWords: ["パオーン"], realWordJa: "象", displayJa: "ぞう", imageFile: "animals/animals_elephant.png" },
      { id: "butterfly", babyWords: ["ちょうちょ"], realWordJa: "蝶", displayJa: "ちょうちょ", imageFile: "animals/animals_butterfly.png" },
      { id: "zebra", babyWords: ["しーまま"], realWordJa: "縞馬", displayJa: "しまうま", imageFile: "animals/animals_zebra.png" },
      { id: "monkey", babyWords: ["アイアイ"], realWordJa: "猿", displayJa: "さる", imageFile: "animals/animals_monkey.png" },
    ],
  },
  {
    id: "actions",
    nameJa: "行動",
    emoji: "🏃",
    entries: [
      { id: "walk", babyWords: ["あんよ"], realWordJa: "歩く", displayJa: "あるく", imageFile: "actions/actions_walk.png" },
      { id: "throw", babyWords: ["ポイ"], realWordJa: "捨てる", displayJa: "すてる", imageFile: "actions/actions_throw.png" },
      { id: "sit", babyWords: ["えんと", "おっちん"], realWordJa: "座る", displayJa: "すわる", imageFile: "actions/actions_sit.png" },
      { id: "chew", babyWords: ["かみかみ"], realWordJa: "噛む", displayJa: "かむ", imageFile: "actions/actions_chew.png" },
      { id: "stand", babyWords: ["たっち"], realWordJa: "立つ", displayJa: "たつ", imageFile: "actions/actions_stand.png" },
      { id: "scratch", babyWords: ["かいかい", "かきかき"], realWordJa: "かゆい・かく", displayJa: "かゆい", imageFile: "actions/actions_scratch.png" },
      { id: "tidy", babyWords: ["ないない"], realWordJa: "片付ける", displayJa: "かたづける", imageFile: "actions/actions_tidy.png" },
      { id: "pray", babyWords: ["なむなむ"], realWordJa: "祈る・お参り", displayJa: "おまいり", imageFile: "actions/actions_pray.png" },
      { id: "sleep", babyWords: ["ねんね"], realWordJa: "寝る", displayJa: "ねる", imageFile: "actions/actions_sleep.png" },
      { id: "pee", babyWords: ["ちー", "しー", "ちっち"], realWordJa: "おしっこ", displayJa: "おしっこ", imageFile: "actions/actions_pee.png" },
      { id: "poop", babyWords: ["うんうん", "んち"], realWordJa: "うんち", displayJa: "うんち", imageFile: "actions/actions_poop.png" },
      { id: "wash", babyWords: ["きれいきれい"], realWordJa: "洗う", displayJa: "あらう", imageFile: "actions/actions_wash.png" },
      { id: "eat", babyWords: ["ごっくん", "もぐもぐ"], realWordJa: "食べる", displayJa: "たべる", imageFile: "actions/actions_eat.png" },
      { id: "carry", babyWords: ["だー", "だっだー"], realWordJa: "抱っこ", displayJa: "だっこ", imageFile: "actions/actions_carry.png" },
      { id: "piggyback", babyWords: ["おんも"], realWordJa: "おんぶ", displayJa: "おんぶ", imageFile: "actions/actions_piggyback.png" },
      { id: "getdown", babyWords: ["おんり"], realWordJa: "降りる", displayJa: "おりる", imageFile: "actions/actions_getdown.png" },
      { id: "peekaboo", babyWords: ["ばぁ"], realWordJa: "いないいないばあ", displayJa: "いないいないばあ", imageFile: "actions/actions_peekaboo.png" },
      { id: "cut", babyWords: ["ちょっきん"], realWordJa: "切る", displayJa: "きる", imageFile: "actions/actions_cut.png" },
      { id: "spin", babyWords: ["くるくる"], realWordJa: "回る", displayJa: "まわる", imageFile: "actions/actions_spin.png" },
      { id: "slide", babyWords: ["シュー"], realWordJa: "滑る", displayJa: "すべる", imageFile: "actions/actions_slide.png" },
      { id: "knock", babyWords: ["コンコン"], realWordJa: "ノックする", displayJa: "ノック", imageFile: "actions/actions_knock.png" },
      { id: "blownose", babyWords: ["ちんする"], realWordJa: "鼻をかむ", displayJa: "はなをかむ", imageFile: "actions/actions_blownose.png" },
      { id: "diaper", babyWords: ["かえかえ"], realWordJa: "おむつを替える", displayJa: "おむつ", imageFile: "actions/actions_diaper.png" },
      { id: "wipe", babyWords: ["ふきふき"], realWordJa: "ふく", displayJa: "ふく", imageFile: "actions/actions_wipe.png" },
      { id: "wakeup", babyWords: ["おっき"], realWordJa: "起き上がる", displayJa: "おきる", imageFile: "actions/actions_wakeup.png" },
    ],
  },
  {
    id: "things",
    nameJa: "もの",
    emoji: "🧢",
    entries: [
      { id: "hat", babyWords: ["あっぽん", "しょっぽ"], realWordJa: "帽子", displayJa: "ぼうし", imageFile: "things/things_hat.png" },
      { id: "clothes", babyWords: ["べべ", "おべべ"], realWordJa: "洋服", displayJa: "おようふく", imageFile: "things/things_clothes.png" },
      { id: "shoes", babyWords: ["くっく"], realWordJa: "靴", displayJa: "くつ", imageFile: "things/things_shoes.png" },
      { id: "socks", babyWords: ["たった", "たんたん"], realWordJa: "靴下", displayJa: "くつした", imageFile: "things/things_socks.png" },
      { id: "plate", babyWords: ["おたら"], realWordJa: "皿", displayJa: "おさら", imageFile: "things/things_plate.png" },
      { id: "mail", babyWords: ["うーびん"], realWordJa: "郵便", displayJa: "ゆうびん", imageFile: "things/things_mail.png" },
      { id: "tv", babyWords: ["テビレ"], realWordJa: "テレビ", displayJa: "テレビ", imageFile: "things/things_tv.png" },
      { id: "precious", babyWords: ["だいじだいじ"], realWordJa: "大切なもの", displayJa: "だいじなもの", imageFile: "things/things_precious.png" },
    ],
  },
  {
    id: "vehicles",
    nameJa: "乗り物",
    emoji: "🚗",
    entries: [
      { id: "car", babyWords: ["ブーブー"], realWordJa: "車", displayJa: "くるま", imageFile: "vehicles/vehicles_car.png" },
      { id: "train", babyWords: ["きしゃぽっぽ", "ぽっぽ"], realWordJa: "汽車・電車", displayJa: "でんしゃ", imageFile: "vehicles/vehicles_train.png" },
      { id: "plane", babyWords: ["こうき"], realWordJa: "飛行機", displayJa: "ひこうき", imageFile: "vehicles/vehicles_plane.png" },
      { id: "ambulance", babyWords: ["キューキュ", "ピーポー"], realWordJa: "救急車", displayJa: "きゅうきゅうしゃ", imageFile: "vehicles/vehicles_ambulance.png" },
    ],
  },
  {
    id: "body",
    nameJa: "体",
    emoji: "👀",
    entries: [
      { id: "eyes", babyWords: ["おめめ", "めんめ"], realWordJa: "目", displayJa: "め", imageFile: "body/body_eyes.png" },
      { id: "breast", babyWords: ["ぱいぱい"], realWordJa: "おっぱい", displayJa: "おっぱい", imageFile: "body/body_breast.png" },
      { id: "belly", babyWords: ["ぽんぽ", "ぽんぽん"], realWordJa: "お腹", displayJa: "おなか", imageFile: "body/body_belly.png" },
      { id: "hands", babyWords: ["てて", "おてて"], realWordJa: "手", displayJa: "て", imageFile: "body/body_hands.png" },
      { id: "feet", babyWords: ["あんよ"], realWordJa: "足", displayJa: "あし", imageFile: "body/body_feet.png" },
      { id: "head", babyWords: ["おつむ", "かんかん"], realWordJa: "頭", displayJa: "あたま", imageFile: "body/body_head.png" },
      { id: "teeth", babyWords: ["はぁは"], realWordJa: "歯", displayJa: "は", imageFile: "body/body_teeth.png" },
      { id: "bottom", babyWords: ["おちり"], realWordJa: "お尻", displayJa: "おしり", imageFile: "body/body_bottom.png" },
    ],
  },
  {
    id: "food",
    nameJa: "食べ物",
    emoji: "🍚",
    entries: [
      { id: "rice", babyWords: ["まんま"], realWordJa: "ごはん", displayJa: "ごはん", imageFile: "food/food_rice.png" },
      { id: "noodles", babyWords: ["ちゅるちゅる", "ちゅーちゅー"], realWordJa: "麺類", displayJa: "めんるい", imageFile: "food/food_noodles.png" },
      { id: "milk", babyWords: ["にゅーにゅー", "みーく"], realWordJa: "牛乳・ミルク", displayJa: "ミルク", imageFile: "food/food_milk.png" },
    ],
  },
  {
    id: "other",
    nameJa: "その他",
    emoji: "✨",
    entries: [
      { id: "bath", babyWords: ["たんたん", "たーたー"], realWordJa: "風呂", displayJa: "おふろ", imageFile: "other/other_bath.png" },
      { id: "hotdrink", babyWords: ["おぶ", "ぶー", "ぶぶ"], realWordJa: "お湯・お茶", displayJa: "おちゃ", imageFile: "other/other_hotdrink.png" },
      { id: "dirty", babyWords: ["ばっちい"], realWordJa: "汚い", displayJa: "きたない", imageFile: "other/other_dirty.png" },
      { id: "no", babyWords: ["め！"], realWordJa: "だめ！", displayJa: "だめ", imageFile: "other/other_no.png" },
      { id: "pocket", babyWords: ["ポッケ"], realWordJa: "ポケット", displayJa: "ポケット", imageFile: "other/other_pocket.png" },
      { id: "delicious", babyWords: ["おいちい", "うまうま"], realWordJa: "おいしい", displayJa: "おいしい", imageFile: "other/other_delicious.png" },
      { id: "star", babyWords: ["おほしさま"], realWordJa: "星", displayJa: "ほし", imageFile: "other/other_star.png" },
      { id: "outside", babyWords: ["おんも"], realWordJa: "外", displayJa: "そと", imageFile: "other/other_outside.png" },
      { id: "hot", babyWords: ["あっちっち"], realWordJa: "熱い・暑い", displayJa: "あつい", imageFile: "other/other_hot.png" },
      { id: "elevator", babyWords: ["エベレーター"], realWordJa: "エレベーター", displayJa: "エレベーター", imageFile: "other/other_elevator.png" },
      { id: "thanks", babyWords: ["あんと"], realWordJa: "ありがとう", displayJa: "ありがとう", imageFile: "other/other_thanks.png" },
      { id: "beautiful", babyWords: ["ちれい"], realWordJa: "きれい", displayJa: "きれい", imageFile: "other/other_beautiful.png" },
      { id: "smelly", babyWords: ["くちゃいくちゃい"], realWordJa: "くさい", displayJa: "くさい", imageFile: "other/other_smelly.png" },
    ],
  },
];

export function getImagePath(imageFile: string): string {
  const filename = imageFile.split("/").pop() ?? imageFile;
  return `/vocab-images/${filename}`;
}
