export function formatResumeData(data: any): {module: any; data: any}[] {
  const formatted = []
  console.log(data)
  for (const block in data) {
    const obj = {
      module: block,
      data: data[block],
    }
    formatted.push(obj)
  }

  return formatted
}
