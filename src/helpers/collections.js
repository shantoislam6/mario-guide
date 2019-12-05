export const sortCollections = function(collections, type="assc"){
    return collections.sort(function(a, b){
        return type === 'desc' ? b.created_at - a.created_at  : a.created_at - b.created_at
    });
}