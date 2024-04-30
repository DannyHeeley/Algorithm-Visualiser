const partition = (left, right) => {
    pivot = right;
    i = left;
    j = right - 1;
    while (i < j) {
        while (i < right && list[i] < pivot) {
            i += 1;
        }
        while (j > left && list[j] > pivot) {
            j -= 1;
        }
        if (i < j) {
            swap(list[i], list[j]);
        }
        if (list[i] > list[pivot]) {
            swap(list[i], list[pivot]);
        }
    }
    return i;
};

const quicksort = (left, right) => {
    if (left < right) {
        p = partition(left, right);
        quicksort(left, p - 1);
        quicksort(p + 1, right);
    }
};
