function p(fns = [], num = 1) {
  const _time = 'time',
    _start = 'start',
    _end = 'end',
    allMeasures = []

  if (!Array.isArray(fns)) {
    fns = Array.of(fns)
  }

  fns.forEach(v => {
    for (let i = 0; i < num; i++) {
      performance.mark(_start)
      v()
      performance.mark(_end)
      performance.measure(_time, _start, _end)
    }

    const measures = performance.getEntriesByName(_time)
    const sum = measures.reduce((prev, current) => current.duration + prev, 0)
    const average = sum / num
    const msg = {
      name: v.name,
      num,
      average,
      sum
    }

    performance.clearMarks()
    performance.clearMeasures()

    allMeasures.push(msg)
  })

  allMeasures.sort((a, b) => a.average - b.average)

  allMeasures.forEach((v, k) => {
    console.log(
      '%cTop：%d，函数： %s，执行次数：%d，平均耗时：%f ms，总耗时：%f ms',
      'color: green;',
      k + 1,
      v.name,
      v.num,
      v.average,
      v.sum
    )
  })
}

// 测试数据
p([f1, f2], 100)

function f1() {
  for (let i = 0; i < 1000000; i++) {
    let a = 1,
      b = 2
    ;[b, a] = [a, b]
  }
}

function f2() {
  for (let i = 0; i < 1000000; i++) {
    let a = 1,
      b = 2,
      tmp
    tmp = a
    a = b
    b = tmp
  }
}
