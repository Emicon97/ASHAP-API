export function autoPopulateLead(query: string) {
  return function () {
    this.populate(query);
  };
}
