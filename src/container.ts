import "reflect-metadata";
import { Container } from "inversify";
import { ProductSearchService } from "./features/products/search/application/product-search.service";
import { ProductSearchRepository } from "./features/products/search/infraestructure/product-search.repository";
import { IProductSearchRepository } from "./features/products/search/domain/repositories/product-search.repository.interface";
import { TYPES } from "./types";
import { IProductSearchService } from "./features/products/search/domain/services/product-search.service.interface";

const container = new Container();

// Primero, registrar el repositorio en el contenedor
container.bind<IProductSearchRepository>(TYPES.IProductSearchRepository).to(ProductSearchRepository).inSingletonScope();
container.bind<IProductSearchService>(TYPES.IProductSearchService).to(ProductSearchService).inSingletonScope();

// Luego, registrar el servicio, asegurando que el repositorio esté listo
// container.bind<ProductSearchService>(TYPES.ProductSearchService).to(ProductSearchService);

export default container;