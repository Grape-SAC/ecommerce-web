import { Container } from "inversify";
import { ProductSearchService } from "./features/products/search/application/product-search.service";
import { ProductSearchRepository } from "./features/products/search/infraestructure/product-search.repository";
import { IProductSearchRepository } from "./features/products/search/domain/repositories/product-search.repository.interface";
import { TYPES } from "./types";
import { IProductSearchService } from "./features/products/search/domain/services/product-search.service.interface";
import { IProductDetailRepository } from "./features/products/details/domain/repositories/product-detail.repository.interface";
import { IProductDetailService } from "./features/products/details/domain/services/product-detail.service.interface";
import { ProductDetailRepository } from "./features/products/details/infraestructure/product-detail.repository";
import { ProductDetailService } from "./features/products/details/application/product-detail.service";

const container = new Container();

container.bind<IProductSearchRepository>(TYPES.IProductSearchRepository).to(ProductSearchRepository).inSingletonScope();
container.bind<IProductSearchService>(TYPES.IProductSearchService).to(ProductSearchService).inSingletonScope();
container.bind<IProductDetailRepository>(TYPES.IProductDetailRepository).to(ProductDetailRepository).inSingletonScope();
container.bind<IProductDetailService>(TYPES.IProductDetailService).to(ProductDetailService).inSingletonScope();

export default container;