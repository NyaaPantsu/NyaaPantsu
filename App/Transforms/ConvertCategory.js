const categoryIndex = {
  '3_': 'Anime',
  '3_12': 'Anime - Anime Music Video',
  '3_5': 'Anime - English-translated',
  '3_13': 'Anime - Non-English-translated',
  '3_6': 'Anime - Raw',
  '2_': 'Audio',
  '2_3': 'Audio - Lossless',
  '2_4': 'Audio - Lossy',
  '4_': 'Literature',
  '4_7': 'Literature - English-translated',
  '4_8': 'Literature - Raw',
  '4_14': 'Literature - Non-English-translated',
  '5_': 'Live Action',
  '5_9': 'Live Action - English-translated',
  '5_10': 'Live Action - Idol/Promotional Video',
  '5_18': 'Live Action - Non-English-translated',
  '5_11': 'Live Action - Raw',
  '6_': 'Pictures',
  '6_15': 'Pictures - Graphics',
  '6_16': 'Pictures - Photos',
  '1_': 'Software',
  '1_1': 'Software - Applications',
  '1_2': 'Software - Games'
}

export default (category: number, subCategory: number) => {
  return categoryIndex[category + '_' + subCategory]
}
