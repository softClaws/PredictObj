const utils = {};

utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220, 1664485938220, 1682255271235];
utils.flaggedSamples =[78,79,217,103,223,305,381,379,434,433,435,436,437,438,439,440,463,561,568,640,643,657,658,659,660,661,683,705,881,1257,1258,1259,1260,1261,1262,1263,1264,1315,1361,1362,1363,1364,1365,1366,1367,1481,1482,1483,1484,1485,1486,1487,1488,1610,1609,1611,1801,1937,1938,1969,2022,2020,2019,2018,2031,2281,2601,2603,2723,2791,2792,2853,2933,2965,3081,3082,3083,3084,3085,3086,3087,3088,3197,3195,3194,3225,3377,3378,3379,3380,3381,3382,3383,3384,3403,3426,3425,3429,3430,3427,3428,3441,3475,3485,3537,3538,3539,3540,3541,3542,3543,3544,3593,3690,3694,3696,3697,3698,3699,3700,3701,3702,3703,3704,3732,3770,3873,3995,4004,4005,4006,4007,4008,4010,4009,4043,4211,4411,4475,4609,4610,4611,4612,4613,4614,4615,4657,4701,4702,4865,4866,4867,4868,4869,4870,4871,4872,4929,4930,4931,4932,4934,4933,4935,4936,4953,4954,4955,4956,4957,4958,4959,4960,4962,5008,5032,5217,5219,5220,5221,5222,5223,5256,5255,5254,5250,5249,5257,5258,5259,5260,5261,5262,5263,5264,5428,5429,5430,5417,5431,5432,5537,5538,5539,5540,5541,5542,5543,5544,5551,5589,5592, 339,40,760,801,802,803,804,805,893,894,895,890,1040,1295,1587,1579,1715,2465,2904,3080,3399,3692,3817,3878,4049,4395,4873,4874,4875,4876,4877,4878,4879,4880,5295,5294,5290,5365,5366,5367,5368,5386,5385,5387,5388,5389,5390,5391,5392,5627,5628,5610,5678]

utils.classes = ['car', 'fish', 'house', 'tree', 'bicycle', 'guitar', 'pencil', 'clock']
utils.styles = {
   car: { color: "gray", text: "🚗" },
   fish: { color: "red", text: "🐠" },
   house: { color: "yellow", text: "🏠" },
   tree: { color: "green", text: "🌳" },
   bicycle: { color: "cyan", text: "🚲" },
   guitar: { color: "blue", text: "🎸" },
   pencil: { color: "magenta", text: "✏️" },
   clock: { color: "lightgray", text: "🕒" },
};
utils.styles["?"] = { color: "red", text: "❓" };

utils.formatPercent = (n) => {
   return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
   process.stdout.clearLine();
   process.stdout.cursorTo(0);
   const percent = utils.formatPercent(count / max);
   process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (objArray, key) => {
   const groups = {};
   for (let obj of objArray) {
      const val = obj[key];
      if (groups[val] == null) {
         groups[val] = [];
      }
      groups[val].push(obj);
   }
   return groups;
};

utils.distance = (p1, p2) => {
   let sqDist = 0;
   for(let i = 0; i < p1.length; i++){
      sqDist += (p1[i] - p2[i]) ** 2;
   }
   return Math.sqrt(sqDist);
};

utils.getNearest = (loc, points, k = 1) => {
   const obj = points.map((val, ind) => {
      return { ind, val };
   });
   const sorted = obj.sort((a, b) => {
      return utils.distance(loc, a.val) - utils.distance(loc, b.val);
   });
   const indices = sorted.map((obj) => obj.ind);
   return indices.slice(0, k);
};

utils.invLerp = (a, b, v) => {
   return (v - a) / (b - a);
};

utils.normalizePoints = (points, minMax) => {
   let min, max;
   const dimensions = points[0].length;
   if (minMax) {
      min = minMax.min;
      max = minMax.max;
   } else {
      min = [...points[0]];
      max = [...points[0]];
      for (let i = 1; i < points.length; i++) {
         for (let j = 0; j < dimensions; j++) {
            min[j] = Math.min(min[j], points[i][j]);
            max[j] = Math.max(max[j], points[i][j]);
         }
      }
   }
   for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < dimensions; j++) {
         points[i][j] = utils.invLerp(min[j], max[j], points[i][j]);
      }
   }
   return { min, max };
};

utils.toCSV = (headers, samples) => {
   let str = headers.join(",") + "\n";
   for (const sample of samples) {
      str += sample.join(",") + "\n";
   }
   return str;
};

if (typeof module !== "undefined") {
   module.exports = utils;
}
