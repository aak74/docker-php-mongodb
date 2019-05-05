export default (allMenuItems, isUnauthorized) => {
  console.log('getLeftMenu', allMenuItems);
  if (!allMenuItems || !allMenuItems.map) {
    throw new Error('Bad parameters');
  }
  const menuItems = allMenuItems.slice(0);

  const result = [];
  menuItems.forEach(group => {
    if (!group.items || !group.items.reduce) {
      return;
    }
    const items = group.items.filter(item => {
      // console.log('item', item.forUnauthorized, isUnauthorized);
      if (!item.forUnauthorized && isUnauthorized) {
        return false;
      }
      if (item.forUnauthorized && !isUnauthorized) {
        return false;
      }
      return true;
    }, []);
    if (items.length) {
      result.push(Object.assign({}, group, { items }));
    }
    // return true;
  });
  return result;
};
