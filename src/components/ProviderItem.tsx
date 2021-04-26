/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import Edit from '@material-ui/icons/Edit';
import styles from '../styles/components/ProviderItem.module.css';

interface productsProps {
        id: number,
        name: string,
}

export interface ItemProps {
    provider: {
      name: string,
      products: productsProps[],
      telefone: String[],
      email: String[],
      website?: string,
    },
  }

// eslint-disable-next-line no-undef
const Products: React.FC<ItemProps> = ({ provider }) => (
  <div className={styles.providersContainer}>
    <section>
      <div className={styles.informations}>
        <div className={styles.name}>
          <p>Fornecedor: </p>
          <strong>{provider.name}</strong>
        </div>
        <fieldset className={styles.products}>
          <legend>Produtos: </legend>
          {provider.products !== undefined && provider.products.map((product) => (<strong>{product.name}</strong>))}
        </fieldset>
        <fieldset className={styles.addtionalInformations}>
          <p>Contatos: </p>
          <div>
            <p>Telefone: </p>
            { provider.telefone !== undefined && provider.telefone.map((telefone) => (<strong>{telefone}</strong>))}
          </div>
          <div>
            <p>Email(s): </p>
            {provider.email !== undefined && provider.email.map((email) => (<strong>{email}</strong>))}
          </div>

          <div>
            {provider.website ? (
              <>
                <p>Website: </p>
                <a href={provider.website}>{provider.website}</a>
              </>
            ) : (
              <>
                <p>Website: </p>
                <p>Sem Website cadastrado</p>
              </>
            )}
          </div>
        </fieldset>
      </div>

      <div className={styles.buttonsContainer}>
        <button type="button">
          <Edit style={{ color: '#fff', fontSize: 20, marginRight: '0.5rem' }} />
          Editar
        </button>
      </div>
    </section>
  </div>
);
export default Products;
