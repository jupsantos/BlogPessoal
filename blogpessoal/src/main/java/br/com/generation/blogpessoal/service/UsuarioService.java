package br.com.generation.blogpessoal.service;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;
import org.apache.commons.codec.binary.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.generation.blogpessoal.model.UsuarioLogin;
import br.com.generation.blogpessoal.model.Usuario;
import br.com.generation.blogpessoal.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<Usuario> listarUsuarios(){

		return usuarioRepository.findAll();

	}
	
	public Optional<Usuario> cadastrarUsuario(Usuario usuario) {
		
		if(usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent())
			return Optional.empty();	
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		String senhaEncoder = encoder.encode(usuario.getSenha());
		usuario.setSenha(senhaEncoder);
		
		return Optional.of(usuarioRepository.save(usuario));
	}
	
	public Optional<Usuario> atualizarUsuario(Usuario usuario) {
		/**
		 * Verifica através no metodo findById se o id para atualização existe no banco
		 * Se o usuario isPresent vamos verificar se o ID enviado é diferente 
		 * do usuario informado, se for retorna vazio
		 * Se não criptografa a senha e salva os dados 
		 * Se o id não estver presente ele retorna vazio
		 */
		if (usuarioRepository.findById(usuario.getId()).isPresent()) {

			Optional<Usuario> buscaUsuario = usuarioRepository.findByUsuario(usuario.getUsuario());

			if (buscaUsuario.isPresent()) {
				if (buscaUsuario.get().getId() != usuario.getId())
					return Optional.empty();
			}

			usuario.setSenha(criptografarSenha(usuario.getSenha()));

			return Optional.of(usuarioRepository.save(usuario));
		}

		return Optional.empty();
	}
	
	private String criptografarSenha(String senha) {
		/**
		 *  Instancia um objeto da Classe BCryptPasswordEncoder para criptografar
		 *  a senha
		 */
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		return encoder.encode(senha);

	}
	
	private boolean compararSenhas(String senhaDigitada, String senhaBanco) {

		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		return encoder.matches(senhaDigitada, senhaBanco);

	}
	
	private String gerarBasicToken(String email, String password) {

		String tokenBase = email + ":" + password;
		byte[] tokenBase64 = Base64.encodeBase64(tokenBase.getBytes(Charset.forName("US-ASCII")));
		return "Basic " + new String(tokenBase64);

	}
	
	public Optional<UsuarioLogin> logar(Optional<UsuarioLogin> usuarioLogin) {

		Optional<Usuario> usuario = usuarioRepository.findByUsuario(usuarioLogin.get().getUsuario());

		if (usuario.isPresent()) {
		
			if (compararSenhas(usuarioLogin.get().getSenha(), usuario.get().getSenha())) {

				usuarioLogin.get().setId(usuario.get().getId());
				usuarioLogin.get().setNome(usuario.get().getNome());
				usuarioLogin.get().setSenha(usuario.get().getSenha());
				usuarioLogin.get()
						.setToken(gerarBasicToken(usuarioLogin.get().getUsuario(), usuarioLogin.get().getSenha()));

				return usuarioLogin;

			}
		}

		return Optional.empty();

	}
	
	
}
