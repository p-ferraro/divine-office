const feastDays = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Saint Matthias, Apostle",
    "Wednesday in the 7th week of Easter",
    "Thursday in the 7th week of Easter",
    "Friday in the 7th week of Easter",
    "Saturday in the 7th week of Easter",
    "Pentecost",
    "The Blessed Virgin Mary, Mother of the Church",
    "Tuesday in the 7th week of Ordinary Time",
    "Wednesday in the 7th week of Ordinary Time",
    "Thursday in the 7th week of Ordinary Time",
    "Friday in the 7th week of Ordinary Time",
    "Saturday in the 7th week of Ordinary Time",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Twenty-First Sunday in Ordinary Time",
    "Saint Augustine, Bishop and Doctor of the Church",
    "The Passion of Saint John the Baptist",
    "Wednesday in the Twenty-First Week in Ordinary Time",
    "Thursday in the Twenty-First Week in Ordinary Time",
    "Friday in the Twenty-First Week in Ordinary Time",
    "Saturday in the Twenty-First Week in Ordinary Time",
    "Twenty-Second Sunday in Ordinary Time",
    "Monday in the Twenty-Second Week in Ordinary Time",
    "Tuesday in the Twenty-Second Week in Ordinary Time",
    "Wednesday in the Twenty-Second Week in Ordinary Time",
    "Thursday in the Twenty-Second Week in Ordinary Time",
    "The Nativity of the Blessed Virgin Mary",
    "Saint Peter Claver, Priest",
    "Twenty-Third Sunday in Ordinary Time",
    "Monday in the Twenty-Third Week in Ordinary Time",
    "Tuesday in the Twenty-Third Week in Ordinary Time",
    "Saint John Chrysostom, Bishop and Doctor",
    "Triumph of the Cross",
    "Our Lady of Sorrows",
    "Saint Cornelius, Pope & Martyr, Saint Cyprian, Bishop & Martyr",
    "Sunday in the Twenty-Fourth Week in Ordinary Time",
    "Monday in the Twenty-Fourth Week in Ordinary Time",
    "Tuesday in the Twenty-Fourth Week in Ordinary Time",
    "Wednesday in the Twenty-Fourth Week in Ordinary Time",
    "Thursday in the Twenty-Fourth Week in Ordinary Time",
    "Friday in the Twenty-Fourth Week in Ordinary Time",
    "Saturday in the Twenty-Fourth Week in Ordinary Time",
    "Sunday in the Twenty-Fifth Week in Ordinary Time",
    "Monday in the Twenty-Fifth Week in Ordinary Time",
    "Tuesday in the Twenty-Fifth Week in Ordinary Time",
    "Wednesday in the Twenty-Fifth Week in Ordinary Time",
    "Thursday in the Twenty-Fifth Week in Ordinary Time",
    "Friday in the Twenty-Fifth Week in Ordinary Time",
    "Saturday in the Twenty-Fifth Week in Ordinary Time",
    "Sunday in the Twenty-Sixth Week in Ordinary Time",
    "Monday in the Twenty-Sixth Week in Ordinary Time",
    "Tuesday in the Twenty-Sixth Week in Ordinary Time",
    "Wednesday in the Twenty-Sixth Week in Ordinary Time",
    "Thursday in the Twenty-Sixth Week in Ordinary Time",
    "Friday in the Twenty-Sixth Week in Ordinary Time",
    "Our Lady of the Rosary",
    "Sunday in the Twenty-Seventh Week in Ordinary Time",
    "Monday in the Twenty-Seventh Week in Ordinary Time",
    "Tuesday in the Twenty-Seventh Week in Ordinary Time",
    "Wednesday in the Twenty-Seventh Week in Ordinary Time",
    "Thursday in the Twenty-Seventh Week in Ordinary Time",
    "Friday in the Twenty-Seventh Week in Ordinary Time",
    "Saturday in the Twenty-Seventh Week in Ordinary Time",
    "Sunday in the Twenty-Eighth Week in Ordinary Time",
    "Monday in the Twenty-Eighth Week in Ordinary Time",
    "Saint Ignatius of Antioch, Bishop and Martyr",
    "Saint Luke, Evangelist",
    "Saints John de Brébeuf and Isaac Jogues, Priests, and Companions, Martyrs",
    "Saint Paul of the Cross, Priest",
    "Saturday in the Twenty-Eighth Week in Ordinary Time",
    "Sunday in the Twenty-Ninth Week in Ordinary Time",
    "Saint John of Capistrano, Priest",
    "Tuesday in the Twenty-Ninth Week in Ordinary Time",
    "Wednesday in the Twenty-Ninth Week in Ordinary Time",
    "Thursday in the Twenty-Ninth Week in Ordinary Time",
    "Friday in the Twenty-Ninth Week in Ordinary Time",
    "Saint Simon and Saint Jude, Apostles",
    "Sunday in the Twenty-Seventh Week in Ordinary Time",
    "Monday in the Thirtieth Week in Ordinary Time",
    "Tuesday in the Thirtieth Week in Ordinary Time",
    "All Saints Day",
    "All Souls Day",
    "Friday in the Thirtieth Week in Ordinary Time",
    "Saturday in the Thirtieth Week in Ordinary Time",
    "Sunday in the Thirty-First Week in Ordinary Time",
    "Monday in the Thirty-First Week in Ordinary Time",
    "Tuesday in the Thirty-First Week in Ordinary Time",
    "Wednesday in the Thirty-First Week in Ordinary Time",
    "Feast for Dedication of St. John Lateran",
    "Saint Leo the Great, Pope and Doctor of the Church",
    "Saint Martin of Tours, Bishop",
    "Sunday in the Thirty-Second Week in Ordinary Time",
    "Saint Frances Xavier Cabrini, Virgin",
    "Tuesday in the Thirty-Second Week in Ordinary Time",
    "Wednesday in the Thirty-Second Week in Ordinary Time",
    "Thursday in the Thirty-Second Week in Ordinary Time",
    "Saint Elizabeth of Hungary, Religious",
    "Saturday in the Thirty-Second Week in Ordinary Time",
    "Sunday in the Thirty-Third Week in Ordinary Time",
    "Monday in the Thirty-Third Week in Ordinary Time",
    "Tuesday in the Thirty-Third Week in Ordinary Time",
    "Wednesday in the Thirty-Third Week in Ordinary Time",
    "Thursday in the Thirty-Third Week in Ordinary Time",
    "Friday in the Thirty-Third Week in Ordinary Time",
    "Saturday in the Thirty-Third Week in Ordinary Time",
  ];

  export default feastDays;