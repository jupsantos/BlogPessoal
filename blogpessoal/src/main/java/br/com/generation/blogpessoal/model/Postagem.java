package br.com.generation.blogpessoal.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "tb_postagem")
public class Postagem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "O atributo título é obrigatório")
	@Size(min = 5, max = 100, message = "O atributo texto "
			+ "deve conter no mínimo 5 caracteres e máximo 100")
	private String titulos;
	
	/**
	 * A annotation @NotBlank indica que um atributo não pode ser nulo E insercao de espaços em branco
	 * O parametro message indica a mensagem que será exibida caso o atributo esteja nula
	 */
	
	@NotBlank(message = "O atributo título é obrigatório")
	@Size(min = 10, max = 500, message = "O atributo texto "
			+ "deve conter no mínimo 10 caracteres e máximo 500")
	private String texto;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date data = new java.sql.Date(System.currentTimeMillis());

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitulos() {
		return titulos;
	}

	public void setTitulos(String titulos) {
		this.titulos = titulos;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}
	
	
}
