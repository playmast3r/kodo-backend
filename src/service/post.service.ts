import Post from '../models/post.model';

export default class PostService {
  constructor() { }

  async getPosts(query: any) {
    const pipeline = [];
    const countPipeline = [];
    //if user has search query, filter the results
    if(query?.q) {
      pipeline.push(
        { 
          $match: {
            $text: {
              $search: query.q,
              $language: 'en',
            },
          }
        },
      );
      countPipeline.push(
        {
          $match: {
            $text: {
              $search: query.q,
              $language: 'en',
            },
          }
        },
      );
    }

    // results per page: determines how many entries are returned
    const resPerPage: number = +query.pageSize || 10;

    // page: determines the page that user is on
    const page: number = +query.currentPage || 1;

    // if user has sorted then sort by that column
    if (query?.sortBy) {
      if (query.sortBy === 'name') {
        pipeline.push(
          {
            $sort: { name: query.sortOrder === 'asc' ? 1 : -1 }
          },
        );
      } else if (query.sortBy === 'dateLastEdited') {
        pipeline.push(
          {
            $sort: { dateLastEdited: query.sortOrder === 'asc' ? 1 : -1 }
          },
        );
      }
    }

    // skip entries based on page and results per page and limit the amount of entries to be shown
    pipeline.push(
      {
        $skip: resPerPage * page - resPerPage,
      },
      {
        $limit: resPerPage,
      },
    );

    
    countPipeline.push({ $count: 'count' });

    const [posts, totalCount]: [any, any] = await Promise.all([
      Post.aggregate(pipeline),
      Post.aggregate(countPipeline),
    ]);

    return { posts, totalCount: totalCount?.[0]?.count ?? 0 };
  }
}