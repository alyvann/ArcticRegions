init_array = [[6029, 7396], [-12, 26], [-32, 28], [-70, 27], [-21, -31], [-22, -12], [-30, -3], [-29, 13], [-29, 4], [-29, 12], [-30, 4], [-12, 9], [-8, 26], [0, 33], [34, 16], [47, 12], [32, 24], [21, 33], [3, 37], [-15, 40], [-39, 35], [-71, -34], [-28, -9], [-7, 25], [-9, 18], [-30, 25], [-40, 19], [-38, 12], [-2, 18], [9, 21], [17, 24], [22, 51], [24, -5], [20, 5], [-11, 42], [-20, 35], [-23, 20], [0, 8], [-6, 11], [-17, 24], [-20, 18], [-34, 51], [-25, 20], [-32, 10], [-34, 0], [-55, -13], [-102, -16], [-80, -7], [-14, 4], [41, 19], [59, 21], [78, 13], [23, 34], [-8, 29], [3, 27], [-21, 29], [21, 16], [71, 16], [32, 3], [33, 20], [-91, 50], [-95, 33], [-23, 13], [-21, 21], [-18, 31], [-30, 30], [-40, 30], [-59, 30], [-152, 53], [-53, 37], [-48, 57], [-24, 24], [-25, 18], [-106, 41], [-13, 19], [110, 49], [10, 20], [-44, 59], [-46, 44], [-50, 15], [-74, 8], [-68, 20], [-62, 30], [-61, 23], [-93, 21], [-154, 55], [-239, 59], [-106, 34], [-64, 13], [-83, 3], [-162, 32], [-135, 10], [-84, -4], [-27, 5], [-62, 33], [-97, 18], [-50, -7], [-62, -35], [-76, -34], [-39, -5], [-60, 32], [-30, 22], [-28, 7], [-27, -7], [-53, -29], [-51, -21], [-74, -24], [-60, -12], [-77, -3], [-19, -9], [-29, -1], [-40, 9], [-37, 16], [-35, 24], [-31, 13], [-26, 2], [-61, -13], [-78, -36], [-35, -9], [-30, 4], [-36, 11], [-73, 29], [-40, -2], [-29, -11], [8, -24], [68, -58], [61, -41], [-51, -5], [-449, 56], [-58, 13], [-82, 34], [-69, 21], [-117, 53], [-90, 29], [-30, 23], [-8, 15], [29, 21], [181, 71]]

adjust_array = [[70, 14], [141, 17], [33, 11], [11, 9], [-37, 15], [-184, -6], [-165, 11], [-143, 28], [-25, 9], [-24, 17], [-24, 25], [5, 29], [35, 31], [20, 21], [6, 11], [-180, -76], [-74, -27], [-58, 8], [-41, 13], [-20, 14], [1, 16], [6, 11], [13, 7], [-96, 32], [-42, 25], [-5, 25], [34, 27], [33, 19], [32, 12], [88, 10], [322, 20], [230, -19], [78, 63], [53, 20], [155, 21], [238, 3], [169, -11], [79, -15], [107, -33], [6, 10], [-26, 30], [674, -180]]

x = 0
y = 0
for coordinates in init_array: 
	x += coordinates[0]
	y += coordinates[1]
	
print x, y

adjust_array[0][0] += x
adjust_array[0][1] += y

print adjust_array